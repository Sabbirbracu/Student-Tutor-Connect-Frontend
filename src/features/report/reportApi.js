import { baseApi } from "../../services/baseApi";

export const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ============================
    // 1️⃣ Create a report (student or studentTutor)
    // ============================
    createReport: builder.mutation({
      query: ({ reportedUser, reason, severity }) => ({
        url: "/reports",
        method: "POST",
        body: { reportedUser, reason, severity },
      }),
      invalidatesTags: ["Reports"], // refresh report list if needed
    }),

    // ============================
    // 2️⃣ List reports (admin)
    // ============================
    getReports: builder.query({
      query: ({ status, severity } = {}) => ({
        url: "/reports",
        method: "GET",
        params: { status, severity },
      }),
      providesTags: ["Reports"],
    }),

    // ============================
    // 3️⃣ Act on a report (admin)
    // ============================
    actOnReport: builder.mutation({
      query: ({ reportId, action }) => ({
        url: `/reports/${reportId}/action`,
        method: "PATCH",
        body: { action },
      }),
      invalidatesTags: ["Reports", "Users"],
    }),
  }),
});

export const {
  useCreateReportMutation,
  useGetReportsQuery,
  useActOnReportMutation,
} = reportApi;
