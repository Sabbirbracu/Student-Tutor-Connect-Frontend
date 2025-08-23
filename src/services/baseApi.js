// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout } from "../features/auth/authSlice";

// const rawBaseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState()?.auth?.token;
//     if (token) headers.set("authorization", `Bearer ${token}`);
//     headers.set("content-type", "application/json");
//     return headers;
//   },
// });

// const baseQueryWithAuth = async (args, api, extra) => {
//   const result = await rawBaseQuery(args, api, extra);
//   if (result?.error?.status === 401) {
//     api.dispatch(logout());
//   }
//   return result;
// };

// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery: baseQueryWithAuth,
//   tagTypes: ["Me", "Auth"],
//   endpoints: () => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth/authSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("content-type", "application/json");
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extra) => {
  const result = await rawBaseQuery(args, api, extra);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Me", "Auth", "Courses", "Tutors"],
  endpoints: (builder) => ({
    // Fetch all courses
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),

    // Fetch single course by ID
    getCourseById: builder.query({
      query: (id) => `/courses/${id}`,
      providesTags: ["Courses"],
    }),

    // Fetch all tutors
    getTutors: builder.query({
      query: () => "/users?tutor=true",
      providesTags: ["Tutors"],
    }),

    // Assign tutor to course
    assignTutor: builder.mutation({
      query: ({ courseId, tutorId }) => ({
        url: `/courses/${courseId}/assign-tutor`,
        method: "POST",
        body: { tutorId },
      }),
      invalidatesTags: ["Courses"], // Refresh courses after assigning
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetTutorsQuery,
  useAssignTutorMutation,
} = baseApi;
