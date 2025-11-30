"""
Chat API endpoint for RAG-powered textbook assistant.

Handles:
- User queries
- Context retrieval
- Response generation
- Citation formatting
- Error handling
"""

import logging
from typing import List, Optional
import os

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from agents import Runner, RunConfig, OpenAIChatCompletionsModel
from openai import AsyncOpenAI

from ..services.query_processor import query_processor
from ..config import settings
from ..agent import textbook_agent, AgentContext

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["chat"])


# Request/Response Models
class ChatRequest(BaseModel):
    """Chat request model."""

    query: str = Field(..., min_length=1, max_length=500, description="User question")
    top_k: Optional[int] = Field(
        5, ge=1, le=10, description="Number of sources to retrieve"
    )


class Source(BaseModel):
    """Source citation model."""

    excerpt_num: int
    title: str
    section: str
    file_path: str
    score: float


class ChatResponse(BaseModel):
    """Chat response model."""

    answer: str
    sources: List[Source]
    has_answer: bool
    confidence: str  # 'high', 'medium', 'low'
    num_sources: int
    query_processed: str  # Show enhanced query for debugging


@router.post("/", response_model=ChatResponse, status_code=status.HTTP_200_OK)
async def chat(request: ChatRequest):
    """
    Process chat query and return RAG-grounded response using Agent.

    Args:
        request: ChatRequest with user query and optional filters

    Returns:
        ChatResponse with answer, sources, and metadata

    Raises:
        HTTPException: If query processing fails
    """
    try:
        logger.info(f"Received chat request: '{request.query}'")

        # Step 1: Process query
        query_info = query_processor.process_query(request.query)
        enhanced_query = query_info["enhanced_query"]

        # Step 2: Configure OpenAI Client for Gemini
        client = AsyncOpenAI(
            api_key=settings.gemini_api_key,
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
        )
        
        # Create model wrapper for Gemini
        model = OpenAIChatCompletionsModel(
            model="gemini-2.0-flash", # Using flash model as per config/intent
            openai_client=client,
        )
        
        # Create RunConfig with the model
        run_config = RunConfig(model=model)
        
        # Note: We must update the agent's model or pass it in RunConfig?
        # In the example, `model` is passed to Agent AND RunConfig.
        # textbook_agent is global, so we should probably override its model for this run via RunConfig or set it here.
        # The example passes `run_config=config` to Runner.run.
        # However, Agent definition also has `model`. 
        # We'll update the global agent's model dynamically or just rely on RunConfig if it overrides.
        # Actually, looking at the example, passing `model` to Agent is cleaner, but our agent is pre-defined.
        # Let's just pass run_config.
        
        # Create a context to capture retrieved chunks
        agent_context = AgentContext()

        # Step 3: Run Agent
        result = await Runner.run(
            textbook_agent, 
            input=enhanced_query, 
            context=agent_context,
            run_config=run_config
        )

        # Step 4: Format Response
        retrieved_chunks = agent_context.retrieved_chunks
        
        sources = []
        for i, chunk in enumerate(retrieved_chunks, 1):
            payload = chunk.get('payload', {})
            sources.append(Source(
                excerpt_num=i,
                title=payload.get('title', 'Unknown'),
                section=payload.get('section', 'Unknown'),
                file_path=payload.get('file_path', ''),
                score=chunk.get('score', 0.0)
            ))

        final_answer = result.final_output
        has_answer = "not covered" not in final_answer.lower() and len(sources) > 0
        if "No relevant information found" in final_answer:
             has_answer = False

        return ChatResponse(
            answer=final_answer,
            sources=sources,
            has_answer=has_answer,
            confidence="high" if has_answer else "low",
            num_sources=len(sources),
            query_processed=enhanced_query,
        )

    except Exception as e:
        logger.error(f"Chat request failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process chat request: {str(e)}",
        )


class TextSelectionRequest(BaseModel):
    """Request model for text selection queries."""

    selected_text: str = Field(
        ..., min_length=10, max_length=2000, description="User-selected text from book"
    )
    query: str = Field(..., min_length=1, max_length=500, description="User question")


@router.post("/text-selection", response_model=ChatResponse)
async def answer_from_selection(request: TextSelectionRequest):
    """
    Answer question based on user-selected text.
    """
    try:
        logger.info(f"Text selection query: '{request.query}'")
        
        # Configure OpenAI Client for Gemini
        client = AsyncOpenAI(
            api_key=settings.gemini_api_key,
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
        )
        
        model = OpenAIChatCompletionsModel(
            model="gemini-2.0-flash",
            openai_client=client,
        )
        
        run_config = RunConfig(model=model)
        
        selection_context = f"\n\nUser Selected Text:\n{request.selected_text}\n\n"
        full_input = f"{request.query}{selection_context}Please explain the selected text in the context of the question."

        result = await Runner.run(textbook_agent, input=full_input, run_config=run_config)
        
        return ChatResponse(
            answer=result.final_output,
            sources=[], # Text selection doesn't pull from vector DB usually, or we could try to search too.
            has_answer=True,
            confidence="high",
            num_sources=0,
            query_processed=request.query,
        )

    except Exception as e:
        logger.error(f"Text selection failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process text selection: {str(e)}",
        )


@router.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """Health check for chat service."""
    return {
        "status": "healthy",
        "service": "chat",
        "retrieval": "qdrant",
        "agent": "openai-agents-sdk",
        "model": "gemini"
    }
