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
  tagTypes: ["Me", "Auth", "Courses", "Tutors", "ExtraRequests", "Reviews"],
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

    // Fetch all StudentTutors or by course code
    getTutors: builder.query({
      query: (courseCode) =>
        courseCode
          ? `/student-tutors/find?courseCode=${courseCode}`
          : `/users?tutor=true`,
      providesTags: ["Tutors"],
    }),

    // Fetch single user by ID
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["Tutors"],
    }),

    // Assign tutor to course
    assignTutor: builder.mutation({
      query: ({ courseId, tutorId }) => ({
        url: `/courses/${courseId}/assign-tutor`,
        method: "POST",
        body: { tutorId },
      }),
      invalidatesTags: ["Courses"],
    }),

    // Submit Extra Slot Request
    requestExtraSlot: builder.mutation({
      query: ({ tutorId, courseId, requestedTime }) => ({
        url: `/extra-requests`,
        method: "POST",
        body: { tutor: tutorId, course: courseId, requestedTime },
      }),
      invalidatesTags: ["ExtraRequests"],
    }),

    // Create text-only review
    createReview: builder.mutation({
      query: ({ studentTutor, course, review }) => ({
        url: `/reviews`,
        method: "POST",
        body: { studentTutor, course, review },
      }),
      invalidatesTags: ["Reviews"],
    }),

    // Fetch reviews for a StudentTutor
    getTutorReviews: builder.query({
      query: (studentTutorId) => `/reviews/tutor/${studentTutorId}`,
      providesTags: (result, error, studentTutorId) => [
        { type: "Reviews", id: studentTutorId },
      ],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetTutorsQuery,
  useGetUserByIdQuery, // <--- added
  useAssignTutorMutation,
  useRequestExtraSlotMutation,
  useCreateReviewMutation,
  useGetTutorReviewsQuery,
} = baseApi;
