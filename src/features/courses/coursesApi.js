import { baseApi } from "../../services/baseApi";

export const coursesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all courses
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),

    // Create a new course
    createCourse: builder.mutation({
      query: (course) => ({
        url: "/courses",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Courses"], // refresh course list
    }),
  }),
});

export const { useGetCoursesQuery, useCreateCourseMutation } = coursesApi;
