
import axios from "axios";

import { APP_CONFIG } from "../config/appConfig";

import {
  ApiError,
  apiErrorHandler,
} from "./apiErrorHandler";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  APP_CONFIG.api.baseUrl;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,

  timeout: APP_CONFIG.api.timeout,

  headers: {
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(apiErrorHandler(error));
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const responseData = response.data;

    if (
      responseData &&
      typeof responseData === "object" &&
      "success" in responseData &&
      responseData.success === false
    ) {
      return Promise.reject(
        new ApiError(
          typeof responseData.message === "string"
            ? responseData.message
            : "The requested operation failed."
        )
      );
    }

    return response;
  },

  (error) => {
    return Promise.reject(apiErrorHandler(error));
  }
);
