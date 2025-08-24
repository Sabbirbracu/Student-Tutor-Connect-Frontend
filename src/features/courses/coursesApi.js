// import { baseApi } from "../../services/baseApi";

// export const coursesApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Fetch all courses
//     getCourses: builder.query({
//       query: () => "/courses",
//       providesTags: ["Courses"],
//     }),

//     // Create a new course
//     createCourse: builder.mutation({
//       query: (course) => ({
//         url: "/courses",
//         method: "POST",
//         body: course,
//       }),
//       invalidatesTags: ["Courses"], // refresh course list
//     }),

//     // Delete a course
//     deleteCourse: builder.mutation({
//       query: (id) => ({
//         url: `/courses/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Courses"], // refresh course list after deletion
//     }),
//   }),
// });

// export const {
//   useGetCoursesQuery,
//   useCreateCourseMutation,
//   useDeleteCourseMutation, // ✅ added
// } = coursesApi;

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

    // Delete a course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Courses"], // refresh course list after deletion
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
