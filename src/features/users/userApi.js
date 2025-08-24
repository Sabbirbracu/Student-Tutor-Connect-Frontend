// frontend/src/services/injectedApis/usersApi.js
import { baseApi } from "../../services/baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users (Admin only)
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
