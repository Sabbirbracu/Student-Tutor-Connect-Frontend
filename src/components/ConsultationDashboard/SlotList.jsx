import { useState } from "react";
import EditSlotModal from "./EditSlotModal";

const SlotList = ({ slots, daysOfWeek, refetch }) => {
  const [editingSlot, setEditingSlot] = useState(null);

  if (!slots || slots.length === 0) {
    return <p className="text-gray-500">No consultation slots uploaded yet.</p>;
  }

  // Format 24-hour time to 12-hour AM/PM
  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
  };

  // Group slots by day
  const slotsByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = slots.filter((slot) => slot.day === day);
    return acc;
  }, {});

  return (
    <>
      <div className="grid grid-cols-7 gap-2 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="border rounded p-2 min-h-[60px]">
            <p className="text-xs font-semibold mb-1">{day.slice(0, 3)}</p>
            {slotsByDay[day]?.length > 0 ? (
              slotsByDay[day].map((slot) => (
                <div key={slot._id} className="mb-1">
                  <p className="bg-blue-100 text-blue-800 rounded text-xs px-1 py-0.5">
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </p>
                  <button
                    className="text-xs text-white bg-green-500 hover:bg-green-600 rounded px-2 py-0.5 mt-1"
                    onClick={() => setEditingSlot(slot)}
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-xs">—</p>
            )}
          </div>
        ))}
      </div>

      {/* Edit Slot Modal */}
      {editingSlot && (
        <EditSlotModal
          slot={editingSlot}
          onClose={() => setEditingSlot(null)}
          onSuccess={() => {
            setEditingSlot(null);
            refetch(); // Refresh slot list after edit
          }}
        />
      )}
    </>
  );
};

export default SlotList;
