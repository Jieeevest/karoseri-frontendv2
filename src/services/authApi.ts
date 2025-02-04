import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define interfaces for Auth API
export interface LoginResponse {
  data: {
    token: string;
    email: string;
    fullName: string;
    role: any;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgetPasswordResponse {
  message: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

// Create a separate API instance for authentication
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_AUTH_API_URL}/api`, // Different base URL for auth
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === "getUser") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<any, void>({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
      // // Customize error handling by transforming the error response
      // transformErrorResponse: (error) => {
      //   if (error?.status === 401) {
      //     return {
      //       code: 401,
      //       message: "Unauthorized access. Please log in again.",
      //     };
      //   }
      //   if (error?.status === 500) {
      //     return {
      //       code: 500,
      //       message: "Server error. Please try again later.",
      //     };
      //   }

      //   return { message: error?.data || "Unknown error" };
      // },
    }),
    forgetPassword: builder.mutation<
      ForgetPasswordResponse,
      ForgetPasswordRequest
    >({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useForgetPasswordMutation } =
  authApi;
