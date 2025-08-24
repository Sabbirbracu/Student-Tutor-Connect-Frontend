const SlotCard = ({ slot }) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow mb-3 flex justify-between items-center">
      <div>
        <p className="font-semibold">{slot.course.name}</p>
        <p className="text-gray-500">
          {slot.day} - {slot.startTime} to {slot.endTime}
        </p>
      </div>
    </div>
  );
};

export default SlotCard;
