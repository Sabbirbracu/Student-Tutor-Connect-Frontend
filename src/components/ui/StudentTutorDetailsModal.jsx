import { useNavigate } from "react-router-dom";
import Button from "./Button";

const StudentTutorDetailsModal = ({ isOpen, onClose, tutor, course, onRequestExtraSlot }) => {
  const navigate = useNavigate();

  if (!isOpen || !tutor) return null;

  const handleViewProfile = () => {
    // Navigate to the tutor's profile page using tutor._id
    navigate(`/profile/${tutor._id}`);
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

        {/* Tutor Info */}
        <h2 className="text-xl font-bold mb-2">{tutor.name}</h2>
        <p className="mb-2"><strong>Email:</strong> {tutor.email}</p>
        <p className="mb-4"><strong>Consultation Slots:</strong> {tutor.consultationSlot || "Not available"}</p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mb-2">
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