"""
Configuration management for the backend application.

This module loads environment variables and provides typed configuration
objects for different parts of the application.
"""

from pathlib import Path
from typing import List

from dotenv import load_dotenv  # Import load_dotenv
from pydantic_settings import BaseSettings

BASE_DIR = (
    Path(__file__).resolve().parent.parent
)  # Points to 'backend/app' then 'backend'
DOTENV_PATH = BASE_DIR / ".env"
load_dotenv(dotenv_path=DOTENV_PATH)


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Qdrant Configuration
    qdrant_api_key: str
    qdrant_url: str
    qdrant_collection_name: str = "rag-embedding"

    # Gemini Configuration
    gemini_api_key: str

    # Application Configuration
    environment: str = "development"
    cors_origins: str = "http://localhost:3000,http://localhost:3001"
    rate_limit_per_minute: int = 100

    class Config:
        """Pydantic configuration."""

        env_file = ".env"
        case_sensitive = False

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins string into list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]


# Global settings instance
settings = Settings()
