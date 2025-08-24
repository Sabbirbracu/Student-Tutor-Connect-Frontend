import { baseApi } from "../../services/baseApi";

export const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==============================
    // Public: Fetch slots for a tutor (for students)
    // ==============================
    getSlotsForStudent: builder.query({
      query: ({ tutorId, courseId }) => ({
        url: "/slots",
        method: "GET",
        params: { tutorId, courseId },
      }),
      providesTags: ["Slots"],
    }),

    // ==============================
    // Tutor: Fetch own slots
    // ==============================
    getMySlots: builder.query({
      query: () => ({
        url: "/slots/mine",
        method: "GET",
      }),
      providesTags: ["Slots"],
    }),

    // ==============================
    // Tutor: Create a new slot
    // ==============================
    createSlot: builder.mutation({
      query: (slotData) => ({
        url: "/slots",
        method: "POST",
        body: slotData, // { course, day, startTime, endTime }
      }),
      invalidatesTags: ["Slots"],
    }),

    // ==============================
    // Tutor: Update slot
    // ==============================
    updateSlot: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/slots/${id}`,
        method: "PATCH",
        body: data, // { course, day, startTime, endTime }
      }),
      invalidatesTags: ["Slots"],
    }),
  }),
});

export const {
  useGetSlotsForStudentQuery, // for public student view
  useGetMySlotsQuery, // tutor dashboard
  useCreateSlotMutation, // tutor dashboard
  useUpdateSlotMutation, // tutor dashboard
} = slotApi;
