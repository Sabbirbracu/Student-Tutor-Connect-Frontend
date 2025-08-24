import { useState } from "react";
import { useUpdateSlotMutation } from "../../features/slot/slotApi";
import Button from "../ui/Button";

const EditSlotModal = ({ slot, onClose, onSuccess }) => {
  const [day, setDay] = useState(slot.day);
  const [startTime, setStartTime] = useState(slot.startTime);
  const [endTime, setEndTime] = useState(slot.endTime);

  const [updateSlot, { isLoading }] = useUpdateSlotMutation();

  const handleSubmit = async () => {
    try {
      await updateSlot({ id: slot._id, day, startTime, endTime }).unwrap();
      onSuccess();
    } catch (err) {
      console.error("Failed to update slot:", err);
      alert("Failed to update slot.");
    }
  };

  const daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Slot</h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Day</label>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            >
              {daysOfWeek.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border px-2 py-1 w-full rounded"
            />
          </div>

          <Button size="sm" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditSlotModal;
