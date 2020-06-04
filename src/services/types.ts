export interface User {
  email: string;
  name: string;
  avatar_url: string;
}

export interface ErrorData {
  reason: string;
}

export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}
