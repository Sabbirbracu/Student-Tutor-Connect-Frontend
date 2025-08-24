import { useState } from "react";
import Button from "./Button";

const ExtraSlotRequestModal = ({ isOpen, onClose, tutor, course, onSubmit }) => {
  const [requestedTime, setRequestedTime] = useState("");

  if (!isOpen || !tutor || !course) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!requestedTime) return alert("Please select a date & time");

    // Pass back to parent component
    await onSubmit({
      tutorId: tutor._id,
      courseId: course._id,
      requestedTime,
    });

    setRequestedTime("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Request Extra Slot</h2>

        <p className="mb-2">
          <strong>Tutor:</strong> {tutor.name}
        </p>
        <p className="mb-4">
          <strong>Course:</strong> {course.name} ({course.code})
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col">
            Requested Time:
            <input
              type="datetime-local"
              value={requestedTime}
              onChange={(e) => setRequestedTime(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 mt-1"
              required
            />
          </label>

          <Button type="submit" variant="gradient">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ExtraSlotRequestModal;
