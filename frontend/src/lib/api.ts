/**
 * API client for backend chat service.
 */

// Docusaurus doesn't expose process.env to browser
// Use window.location for dynamic API URL or hardcode for development
const API_BASE_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://your-backend-url.com'; // TODO: Update for production

export interface ChatRequest {
  query: string;
  top_k?: number;
}

export interface Source {
  excerpt_num: number;
  title: string;
  section: string;
  file_path: string;
  score: number;
}

export interface ChatResponse {
  answer: string;
  sources: Source[];
  has_answer: boolean;
  confidence: "high" | "medium" | "low";
  num_sources: number;
  query_processed: string;
}

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async sendChatMessage(
    query: string,
    topK: number = 5,
  ): Promise<ChatResponse> {
    const response = await fetch(`${this.baseURL}/api/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        top_k: topK,
      } as ChatRequest),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ detail: "Unknown error" }));
      throw new Error(error.detail || "Failed to send message");
    }

    return response.json();
  }

  async healthCheck(): Promise<{ status: string }> {
    const response = await fetch(`${this.baseURL}/api/health`);
    return response.json();
  }
}

// Global instance
export const apiClient = new APIClient();
