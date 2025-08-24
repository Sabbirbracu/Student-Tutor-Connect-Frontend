import { baseApi } from "../../services/baseApi";

export const extraRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get tutor extra requests (Student Tutor)
    getTutorExtraRequests: builder.query({
      query: () => "/extra-requests/tutor-requests",
      providesTags: ["ExtraRequests"],
    }),

    // Update status of extra request (Student Tutor)
    updateExtraRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/extra-requests/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["ExtraRequests"],
    }),
  }),
});

export const {
  useGetTutorExtraRequestsQuery,
  useUpdateExtraRequestStatusMutation,
} = extraRequestApi;
