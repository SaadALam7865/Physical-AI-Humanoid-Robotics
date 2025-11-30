"""
Agent definition using openai-agents SDK.
"""

from agents import Agent, Runner, function_tool, RunContextWrapper
from pydantic import BaseModel
from typing import List, Dict, Optional, Any
import logging
from dataclasses import dataclass, field

from .services.qdrant_client import qdrant_service
from .services.embeddings import embedding_service

logger = logging.getLogger(__name__)

@dataclass
class AgentContext:
    """Context to store state during agent execution."""
    retrieved_chunks: List[Dict] = field(default_factory=list)

@function_tool
async def search_textbook(ctx: RunContextWrapper[AgentContext], query: str) -> str:
    """
    Search the textbook/course content for a given query.
    Use this tool when the user asks a question about the book, robotics, ROS, or the course.
    """
    logger.info(f"Agent tool 'search_textbook' called with query: {query}")
    
    # Access the actual context object
    context_data = ctx.context
    
    # Generate embedding
    embedding = await embedding_service.generate_embedding(query)
    
    # Search Qdrant
    results = await qdrant_service.search_similar(embedding, limit=5)
    
    if not results:
        return "No relevant information found in the textbook."
    
    # Store results in context for the API response
    context_data.retrieved_chunks.extend(results)
    
    # Format for the LLM
    formatted_results = []
    for i, res in enumerate(results, 1):
        payload = res.get("payload", {})
        content = payload.get("content", "")
        title = payload.get("title", "Unknown")
        section = payload.get("section", "")
        formatted_results.append(f"Source {i}: [{title} - {section}]\n{content}\n")
        
    return "\n---\n".join(formatted_results)

# Define the agent with typed context
textbook_agent = Agent[AgentContext](
    name="Physical AI Tutor",
    instructions="""You are an AI teaching assistant for a "Physical AI & Humanoid Robotics" textbook.
    
    Your responsibilities:
    1. Answer student questions using the 'search_textbook' tool.
    2. If the user greets you (e.g., "hi", "hello"), greet back warmly and ask "How can I help you with the course material today?".
    3. If the user provides selected text or specific context, explain it.
    4. ALWAYS cite your sources if you use information from the textbook (e.g., "According to Chapter 1...").
    5. If the tool returns no results, admit you don't know based on the book.
    6. Be concise, encouraging, and educational.
    
    Do not make up information not present in the tool output.
    """,
    tools=[search_textbook],
)
