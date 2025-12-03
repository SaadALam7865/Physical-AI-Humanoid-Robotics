import asyncio
import logging
import os
from typing import Any, Dict, List

from qdrant_client import AsyncQdrantClient, models

from app.config import settings

logger = logging.getLogger(__name__)


class QdrantClient:
    """Service for interacting with Qdrant Cloud vector database."""

    def __init__(self):
        """
        Initialize AsyncQdrantClient.
        """
        self.client = AsyncQdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )
        self.collection_name = settings.qdrant_collection_name

        logger.info(f"Initialized QdrantClient for collection: {self.collection_name}")

    async def recreate_collection(
        self, vector_size: int = 768, on_disk_payload: bool = True
    ):
        """
        Recreate the Qdrant collection, deleting if it exists.
        This is useful for fresh ingestion.
        """
        logger.info(f"Recreating Qdrant collection: {self.collection_name}")
        await self.client.recreate_collection(
            collection_name=self.collection_name,
            vectors_config=models.VectorParams(
                size=vector_size, distance=models.Distance.COSINE
            ),
            on_disk_payload=on_disk_payload,
        )
        logger.info(f"Qdrant collection {self.collection_name} recreated successfully.")

    async def upsert_points(self, points: List[models.PointStruct]):
        """
        Upsert points (vectors + payload) into the Qdrant collection.
        """
        try:
            operation_info = await self.client.upsert(
                collection_name=self.collection_name,
                wait=True,
                points=points,
            )
            logger.info(f"Qdrant upsert operation: {operation_info}")
        except Exception as e:
            logger.error(f"Failed to upsert points to Qdrant: {str(e)}")
            raise

    async def search_points(
        self,
        query_vector: List[float],
        limit: int = 5,
        query_filter: models.Filter = None,
        with_payload: bool = True,
    ) -> List[Dict[str, Any]]:
        """
        Search for points in the Qdrant collection.
        """
        try:
            # ✅ CORRECT METHOD: query_points
            search_result = await self.client.query_points(
                collection_name=self.collection_name,
                query=query_vector,  # ✅ Argument is 'query'
                query_filter=query_filter,  # ✅ CORRECTED: Argument must be 'query_filter' (not 'filter')
                limit=limit,
                with_payload=with_payload,
            )

            # ✅ Access .points and use .model_dump()
            return [hit.model_dump() for hit in search_result.points]

        except Exception as e:
            logger.error(f"Failed to search Qdrant: {str(e)}")
            raise

    async def search_textbook(
        self, query: str, filter_unit: str = None, limit: int = 5
    ) -> List[Dict[str, Any]]:
        """
        Retrieves technical content from the Physical AI textbook using hybrid search.

        Args:
            query: The semantic search string (e.g., "Inverse kinematics formula").
            filter_unit: Optional. Limit search to a specific unit (e.g., "01-part-1-foundations-lab").
            limit: Maximum number of results to return.

        Returns:
            JSON string containing list of matches with 'content', 'page_id', and 'relevance_score'.
        """
        from app.services.embeddings import (
            embedding_service,  # Import locally to avoid circular dependency
        )

        try:
            # 1. Generate Embedding
            query_vector = await embedding_service.generate_embedding(query)

            # 2. Define Filters (if any)
            qdrant_filter = None
            if filter_unit:
                qdrant_filter = models.Filter(
                    must=[
                        models.FieldCondition(
                            key="source_file", range=models.MatchText(text=filter_unit)
                        )
                    ]
                )

            # 3. Hybrid Search (Dense + Sparse/Keyword) - using search_points for dense part
            # For a true hybrid search, Qdrant's capabilities would be leveraged more deeply here.
            # Currently, this is primarily a dense vector search with an optional payload filter.
            results = await self.search_points(
                query_vector=query_vector,
                query_filter=qdrant_filter,
                limit=limit,
                with_payload=True,
            )

            # Reformat results to match the expected 'content', 'page_id', 'relevance_score'
            formatted_results = []
            for r in results:
                payload = r.get("payload", {})
                # Extract chapter/topic path for citation
                source_file_path = payload.get("source_file", "N/A")
                # Example: ../frontend/docs/01-part-1-foundations-lab/01-chapter-1-embodied-ai/00-intro.mdx
                # Convert to frontend-friendly path for user display
                frontend_path = source_file_path.replace("../frontend/docs/", "")

                formatted_results.append(
                    {
                        "content": payload.get("content", "N/A"),
                        "page_id": frontend_path,  # This will be the path for the user to navigate
                        "header": payload.get("header", "N/A"),
                        "relevance_score": r.get("score", 0.0),
                    }
                )

            return formatted_results

        except Exception as e:
            logger.error(f"Textbook retrieval failed: {str(e)}")
            raise


# Global instance
qdrant_client = QdrantClient()
