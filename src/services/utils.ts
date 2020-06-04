import { APIError } from "./types";

export const getErrorMessage = (error: Error, defaultMessage: string) => {
  if (error instanceof APIError) {
    return error.message;
  } else {
    return defaultMessage;
  }
};
