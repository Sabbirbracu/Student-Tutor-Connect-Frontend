// workable version
// import { useNavigate } from "react-router-dom";
// import { useGetSlotsForStudentQuery } from "../../features/slot/slotApi";
// import Button from "./Button";

// const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// const StudentTutorDetailsModal = ({ isOpen, onClose, tutor, course, onRequestExtraSlot }) => {
//   const navigate = useNavigate();

//   // Fetch slots for this tutor & course
//   const { data: slots, isLoading } = useGetSlotsForStudentQuery(
//     { tutorId: tutor?._id, courseId: course?._id },
//     { skip: !isOpen || !tutor }
//   );

//   if (!isOpen || !tutor) return null;

//   const handleViewProfile = () => {
//     navigate(`/profile/${tutor._id}`);
//   };

//   // Map slots by day
//   const slotsByDay = daysOfWeek.reduce((acc, day) => {
//     acc[day] = slots?.filter((slot) => slot.day === day) || [];
//     return acc;
//   }, {});

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
//       <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
//         {/* Close button */}
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           ✕
//         </button>

//         {/* Tutor Info */}
//         <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
//         <p className="mb-2"><strong>Email:</strong> {tutor.email}</p>

//         {/* Mini Google Calendar View */}
//         <div className="mt-4 mb-4">
//           <strong>Consultation Slots:</strong>
//           {isLoading ? (
//             <p className="text-gray-500 mt-2">Loading slots...</p>
//           ) : (
//             <div className="flex gap-2 mt-2 overflow-x-auto border rounded p-2 bg-gray-50">
//               {daysOfWeek.map((day) => (
//                 <div key={day} className="flex-1 min-w-[100px] flex flex-col items-center">
//                   {/* Day Label */}
//                   <p className="font-semibold text-sm mb-1">{day.slice(0,3)}</p>
                  
//                   {/* Slots */}
//                   <div className="flex flex-col gap-1 w-full">
//                     {slotsByDay[day]?.length > 0 ? (
//                       slotsByDay[day].map((slot) => (
//                         <div
//                           key={slot._id}
//                           className="bg-blue-400 text-white text-xs rounded-md py-1 px-1 text-center hover:bg-blue-500 transition cursor-pointer"
//                           title={`${slot.startTime} - ${slot.endTime}`}
//                         >
//                           {slot.startTime} - {slot.endTime}
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-gray-400 text-xs mt-1 text-center">No Slot</div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-wrap gap-2 mt-2">
//           <Button size="sm" onClick={() => onRequestExtraSlot(tutor)}>
//             Request Extra Slot
//           </Button>
//           <Button size="sm" variant="outline" onClick={handleViewProfile}>
//             View Profile
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentTutorDetailsModal;



import { useNavigate } from "react-router-dom";
import { useGetSlotsForStudentQuery } from "../../features/slot/slotApi";
import Button from "./Button";

// Days for mini weekly calendar
const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Function to format time from "HH:mm" to "h:mm AM/PM"
const formatTime = (time) => {
  if (!time) return "";
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

const StudentTutorDetailsModal = ({ isOpen, onClose, tutor, course, onRequestExtraSlot }) => {
  const navigate = useNavigate();

  // Fetch slots for this tutor & course, skip if modal is closed or data missing
  const { data: slots = [], isLoading } = useGetSlotsForStudentQuery(
    { tutorId: tutor?._id, courseId: course?._id },
    { skip: !isOpen || !tutor || !course }
  );

  if (!isOpen || !tutor || !course) return null;

  const handleViewProfile = () => {
    navigate(`/profile/${tutor._id}`);
  };

  // Map slots by day
  const slotsByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = slots?.filter((slot) => slot.day === day) || [];
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Tutor Info */}
        <h2 className="text-xl font-bold mb-1">{tutor.name}</h2>
        <p className="mb-2"><strong>Email:</strong> {tutor.email}</p>
        <p className="mb-2"><strong>Course:</strong> {course.name}</p>

        {/* Mini Google-style Weekly Calendar */}
        <div className="mt-4 mb-4">
          <strong>Consultation Slots:</strong>
          {isLoading ? (
            <p className="text-gray-500 mt-2">Loading slots...</p>
          ) : (
            <div className="flex gap-2 mt-2 overflow-x-auto border rounded p-2 bg-gray-50">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex-1 min-w-[100px] flex flex-col items-center">
                  {/* Day Label */}
                  <p className="font-semibold text-sm mb-1">{day.slice(0,3)}</p>

                  {/* Slots */}
                  <div className="flex flex-col gap-1 w-full">
                    {slotsByDay[day]?.length > 0 ? (
                      slotsByDay[day].map((slot) => (
                        <div
                          key={slot._id}
                          className="bg-blue-400 text-white text-xs rounded-md py-1 px-1 text-center hover:bg-blue-500 transition cursor-pointer"
                          title={`${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`}
                        >
                          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400 text-xs mt-1 text-center">No Slot</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Button size="sm" onClick={() => onRequestExtraSlot(tutor)}>
            Request Extra Slot
          </Button>
          <Button size="sm" variant="outline" onClick={handleViewProfile}>
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentTutorDetailsModal;
