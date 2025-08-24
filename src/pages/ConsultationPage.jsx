import { useGetCoursesQuery } from "../features/courses/coursesApi";
import { useCreateSlotMutation, useGetMySlotsQuery } from "../features/slot/slotApi";

import SlotForm from "../components/ConsultationDashboard/SlotForm";
import SlotList from "../components/ConsultationDashboard/SlotList";

// Days for mini weekly calendar
const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const ConsultationPage = () => {
  const { data: courses } = useGetCoursesQuery();
  const { data: slots = [], refetch } = useGetMySlotsQuery(); // fetch tutor's own slots
  const [createSlot] = useCreateSlotMutation();

  const handleCreateSlot = async (slotData) => {
    try {
      await createSlot(slotData).unwrap();
      refetch(); // refresh slot list after creation
    } catch (error) {
      console.error("Failed to create slot:", error);
    }
  };

  // Group slots by course
  const slotsByCourse = courses?.reduce((acc, course) => {
    acc[course._id] = slots.filter((slot) => slot.course._id === course._id);
    return acc;
  }, {}) || {};

  return (
    <div className="max-w-5xl mx-auto mt-10">
      {/* Form to add slot */}
      <SlotForm courses={courses || []} onCreate={handleCreateSlot} />

      {/* Slots by course */}
      <div className="mt-8 space-y-6">
        {courses?.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">{course.name} ({course.code})</h2>
            <SlotList slots={slotsByCourse[course._id] || []} daysOfWeek={daysOfWeek} refetch={refetch} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationPage;
