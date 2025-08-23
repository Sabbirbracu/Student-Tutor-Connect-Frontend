import { useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const AssignTutorModal = ({ isOpen, onClose, course, tutors = [], onAssign }) => {
  const [loadingTutorId, setLoadingTutorId] = useState(null);

  const handleAssign = async (tutorId) => {
    setLoadingTutorId(tutorId);
    try {
      await onAssign(course._id, tutorId);
    } finally {
      setLoadingTutorId(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Assign Tutor - ${course.name}`} size="max-w-lg">
      <div className="flex flex-col gap-4">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{tutor.name}</h3>
                <p className="text-gray-500 text-sm">{tutor.email}</p>
              </div>
              <Button
                variant="gradient"
                className="ml-4"
                onClick={() => handleAssign(tutor._id)}
                disabled={loadingTutorId === tutor._id}
              >
                {loadingTutorId === tutor._id ? "Assigning..." : "Assign"}
              </Button>
              

            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tutors available.</p>
        )}
      </div>
    </Modal>
  );
};

export default AssignTutorModal;
