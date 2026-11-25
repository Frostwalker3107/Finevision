
import axios from "axios";

export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);

    this.name = "ApiError";

    this.status = options?.status;
    this.path = options?.path;
    this.timestamp = options?.timestamp;
    this.validationErrors = options?.validationErrors;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export const apiErrorHandler = (error) => {
  if (axios.isAxiosError(error)) {
    const response = error.response;

    if (response) {
      const responseData = response.data;

      const message =
        responseData &&
        typeof responseData.message === "string"
          ? responseData.message
          : "An unexpected server error occurred.";

      const errorData =
        responseData &&
        typeof responseData === "object" &&
        "path" in responseData
          ? responseData
          : undefined;

      return new ApiError(message, {
        status: response.status,
        path: errorData?.path,
        timestamp: errorData?.timestamp,
        validationErrors: errorData?.validationErrors,
      });
    }

    if (
      error.code === "ECONNABORTED" ||
      error.code === "ETIMEDOUT"
    ) {
      return new ApiError(
        "The server request timed out. Please try again."
      );
    }

    if (
      error.code === "ERR_NETWORK" ||
      !error.response
    ) {
      return new ApiError(
        "Unable to connect to the server. Please check whether ArthSankalan backend is running."
      );
    }

    return new ApiError(
      error.message || "An unexpected network error occurred."
    );
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError("An unexpected error occurred.");
};
