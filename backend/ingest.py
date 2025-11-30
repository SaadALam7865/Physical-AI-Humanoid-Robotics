"""
Ingestion script for RAG Knowledge Base.

Reads .mdx files from frontend/docs, chunks them, generates embeddings,
and upserts them into Qdrant with stable IDs to prevent duplicates.

Run from backend directory:
    python ingest.py
"""

import os
import sys
import asyncio
import logging
import hashlib
import uuid
import re
from typing import List, Dict, Optional
from pathlib import Path

# Add current directory to path to allow imports from app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.embeddings import embedding_service
from app.services.qdrant_client import qdrant_service
from app.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Constants
BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = (BASE_DIR / "../frontend/docs").resolve()
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200


def clean_mdx(content: str) -> str:
    """Remove MDX specific syntax and frontmatter."""
    # Remove frontmatter (--- ... ---)
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)
    
    # Remove import statements
    content = re.sub(r'^import .*$', '', content, flags=re.MULTILINE)
    
    # Remove export statements
    content = re.sub(r'^export .*$', '', content, flags=re.MULTILINE)
    
    return content.strip()


def split_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> List[str]:
    """
    Split text into chunks with overlap.
    Tries to split on paragraph boundaries (\n\n) first.
    """
    if not text:
        return []

    chunks = []
    start = 0
    text_len = len(text)

    while start < text_len:
        end = start + chunk_size
        
        if end >= text_len:
            chunks.append(text[start:])
            break
            
        # Try to find a paragraph break within the overlap area
        # Look back from 'end' to find the last \n\n
        search_start = max(start + chunk_size // 2, end - 100)
        last_paragraph = text.rfind('\n\n', search_start, end)
        
        if last_paragraph != -1:
            end = last_paragraph + 2 # Include the newlines
        else:
            # If no paragraph break, try single newline
            last_newline = text.rfind('\n', search_start, end)
            if last_newline != -1:
                end = last_newline + 1
            else:
                # If no newline, try space
                last_space = text.rfind(' ', search_start, end)
                if last_space != -1:
                    end = last_space + 1
        
        chunks.append(text[start:end].strip())
        start = end - overlap
        
    return [c for c in chunks if c] # Filter empty chunks


def generate_stable_id(content: str, metadata: Dict) -> str:
    """
    Generate a stable UUID based on content and metadata.
    Ensures that processing the same file/chunk twice produces the same ID.
    """
    # Create a unique string for this chunk
    # We include filename and section to ensure uniqueness across files
    unique_str = f"{metadata.get('file_path', '')}:{metadata.get('chunk_index', 0)}:{content}"
    
    # Use MD5 to get a hash
    hash_object = hashlib.md5(unique_str.encode())
    hex_dig = hash_object.hexdigest()
    
    # Create UUID from hash (UUID5 is namespace based, but this works for stability)
    return str(uuid.UUID(hex=hex_dig))


async def process_docs():
    """Main ingestion process."""
    logger.info(f"Starting ingestion from {DOCS_DIR}")
    
    if not DOCS_DIR.exists():
        logger.error(f"Docs directory not found: {DOCS_DIR}")
        return

    # 1. Collect all chunks
    documents = []
    
    for root, _, files in os.walk(DOCS_DIR):
        for file in files:
            if file.endswith('.mdx') or file.endswith('.md'):
                file_path = Path(root) / file
                rel_path = file_path.relative_to(DOCS_DIR)
                
                # Extract metadata from path
                # Expected structure: Part/Chapter/File.mdx
                parts = rel_path.parts
                part_name = parts[0] if len(parts) > 0 else "General"
                chapter_name = parts[1] if len(parts) > 1 else "General"
                
                try:
                    content = file_path.read_text(encoding='utf-8')
                    cleaned_content = clean_mdx(content)
                    
                    chunks = split_text(cleaned_content, CHUNK_SIZE, CHUNK_OVERLAP)
                    
                    for i, chunk in enumerate(chunks):
                        doc_metadata = {
                            "source": str(rel_path),
                            "file_path": str(rel_path),
                            "filename": file,
                            "part": part_name,
                            "chapter": chapter_name,
                            "chunk_index": i,
                            "title": file.replace('-', ' ').replace('.mdx', '').title()
                        }
                        
                        doc_id = generate_stable_id(chunk, doc_metadata)
                        
                        documents.append({
                            "id": doc_id,
                            "text": chunk,
                            "metadata": doc_metadata
                        })
                        
                except Exception as e:
                    logger.error(f"Error processing {file_path}: {e}")

    logger.info(f"Found {len(documents)} chunks to process")
    
    if not documents:
        logger.warning("No documents found to ingest.")
        return

    # 2. Ensure collection exists
    logger.info("Checking Qdrant collection...")
    await qdrant_service.create_collection()

    # 3. Generate Embeddings & Upsert in Batches
    batch_size = 50
    total_docs = len(documents)
    
    for i in range(0, total_docs, batch_size):
        batch_docs = documents[i:i + batch_size]
        batch_texts = [d["text"] for d in batch_docs]
        
        try:
            logger.info(f"Generating embeddings for batch {i//batch_size + 1}...")
            embeddings = await embedding_service.generate_embeddings_batch(batch_texts)
            
            points = []
            for j, (doc, vector) in enumerate(zip(batch_docs, embeddings)):
                points.append({
                    "id": doc["id"],
                    "vector": vector,
                    "payload": {
                        "content": doc["text"],
                        **doc["metadata"]
                    }
                })
            
            logger.info(f"Upserting batch {i//batch_size + 1} to Qdrant...")
            await qdrant_service.upsert_embeddings(points)
            
        except Exception as e:
            logger.error(f"Error processing batch {i}: {e}")

    logger.info("✅ Ingestion complete!")


if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
        
    asyncio.run(process_docs())
