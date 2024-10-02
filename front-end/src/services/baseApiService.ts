/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = "http://localhost:7810/api";

export enum ServicePrefix {
  TourBooking = "book-tour/v1",
  TableReservation = "table-reservation/v1",
  OnlineMenu = "order-menu/v1",
  Auth = "auth/v1",
}

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const getUserIdFromLocalStorage = () => {
  return localStorage.getItem("userId") || "";
};

const baseApiService = async <T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { headers, ...restOptions } = options;

  const defaultHeaders = {
    "Content-Type": "application/json",
    "au-payload": JSON.stringify({ userId: getUserIdFromLocalStorage() }),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { ...defaultHeaders, ...headers },
    ...restOptions,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return await response.json();
};

const get = async <T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> => {
  return await baseApiService<T>(endpoint, {
    method: "GET",
    ...options,
  });
};

const post = async <T>(
  endpoint: string,
  body: Record<string, any> | null = null,
  options?: RequestOptions
): Promise<T> => {
  return await baseApiService<T>(endpoint, {
    method: "POST",
    body: body ? JSON.stringify(body) : null,
    ...options,
  });
};

const put = async <T>(
  endpoint: string,
  body: Record<string, any> | null = null,
  options?: RequestOptions
): Promise<T> => {
  return await baseApiService<T>(endpoint, {
    method: "PUT",
    body: body ? JSON.stringify(body) : null,
    ...options,
  });
};

const del = async <T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> => {
  return await baseApiService<T>(endpoint, {
    method: "DELETE",
    ...options,
  });
};

export { get, post, put, del };
