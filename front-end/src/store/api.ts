import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "./index.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_DOMAIN,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("idToken", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = retry(
  async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      console.log("result.error", result.error);
      return result;
    }
    return result;
  },
  { maxRetries: 1 },
);

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
});

export const api = baseApi.enhanceEndpoints({
  addTagTypes: ["Auth", "WorkRecord"],
});
