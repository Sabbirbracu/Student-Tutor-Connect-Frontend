import { baseApi } from "../../services/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({ url: "auth/register", method: "POST", body }),
    }),
    login: builder.mutation({
      query: (body) => ({ url: "auth/login", method: "POST", body }),
    }),
    getMe: builder.query({
      query: () => ({ url: "auth/me", method: "GET" }),
      providesTags: ["Me"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } = authApi;
