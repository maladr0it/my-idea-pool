export interface User {
  email: string;
  name: string;
  avatar_url: string;
}

export interface Idea {
  id: string;
  content: string;
  impact: number;
  ease: number;
  confidence: number;
  average_score: number;
  created_at: number;
}

export interface APIErrorData {
  reason: string;
}

export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}
