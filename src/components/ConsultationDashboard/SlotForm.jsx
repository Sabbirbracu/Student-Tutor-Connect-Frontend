import { useState } from "react";

const SlotForm = ({ courses, onCreate }) => {
  const [course, setCourse] = useState("");
  const [day, setDay] = useState(""); // day of the week
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!course || !day || !startTime || !endTime) return;

    // Combine day + time in a way backend can store as Date if needed or just store as strings
    onCreate({ course, day, startTime, endTime });

    // Reset form
    setCourse(""); setDay(""); setStartTime(""); setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md mb-6">
      <h3 className="font-semibold text-lg mb-4">Add Weekly Consultation Slot</h3>

      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">Select Day</option>
        {daysOfWeek.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <div className="flex gap-3 mb-3">
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-1/2 p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Slot
      </button>
    </form>
  );
};

export default SlotForm;
