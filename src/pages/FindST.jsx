import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import ExtraSlotRequestModal from "../components/ui/ExtraSlotRequestModal";
import StudentTutorDetailsModal from "../components/ui/StudentTutorDetailsModal";
import { useGetCoursesQuery, useGetTutorsQuery, useRequestExtraSlotMutation } from "../services/baseApi";

const FindST = () => {
  const [courseCode, setCourseCode] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showExtraSlotModal, setShowExtraSlotModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Fetch courses for resolving courseId
  const { data: courses } = useGetCoursesQuery();

  // Fetch tutors for the given course code
  const { data: tutors, isLoading } = useGetTutorsQuery(searchCode, { skip: !searchCode });

  // Mutation to submit extra slot request
  const [requestExtraSlot] = useRequestExtraSlotMutation();

  // Resolve course object when searching
  useEffect(() => {
    if (searchCode && courses) {
      const course = courses.find((c) => c.code === searchCode);
      if (course) setSelectedCourse(course);
    }
  }, [searchCode, courses]);

  const handleSeeDetails = (tutor) => {
    if (!selectedCourse) return alert("Course not found.");
    setSelectedTutor(tutor);
  };

  const handleRequestExtraSlot = () => {
    if (!selectedCourse) return alert("Course not selected.");
    setShowExtraSlotModal(true);
  };

  return (
    <div className="p-6">
      {/* Search */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter course code..."
          className="border border-gray-300 rounded px-3 py-2"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
        />
        <Button onClick={() => setSearchCode(courseCode)}>Search ST</Button>
      </div>

      {/* Loading */}
      {isLoading && <p>Loading...</p>}

      {/* Tutors List */}
      <ul>
        {tutors?.length > 0 ? (
          tutors.map((tutor) => (
            <li key={tutor._id} className="border-b py-2 flex justify-between items-center">
              <div>
                <span className="font-bold">{tutor.name}</span> - {tutor.email}
              </div>
              <Button size="sm" onClick={() => handleSeeDetails(tutor)}>
                See Details
              </Button>
            </li>
          ))
        ) : (
          <p>No StudentTutors found.</p>
        )}
      </ul>

      {/* Student Tutor Details Modal */}
      <StudentTutorDetailsModal
        isOpen={!!selectedTutor}
        onClose={() => setSelectedTutor(null)}
        tutor={selectedTutor}
        course={selectedCourse} // ← add this
        onRequestExtraSlot={handleRequestExtraSlot}
      />


      {/* Extra Slot Request Modal */}
      <ExtraSlotRequestModal
        isOpen={showExtraSlotModal}
        onClose={() => setShowExtraSlotModal(false)}
        tutor={selectedTutor}
        course={selectedCourse}
        onSubmit={async ({ tutorId, courseId, requestedTime }) => {
          try {
            await requestExtraSlot({ tutorId, courseId, requestedTime }).unwrap();
            alert("Extra slot request submitted successfully!");
            setShowExtraSlotModal(false);
          } catch (err) {
            console.error(err);
            alert("Failed to submit extra slot request.");
          }
        }}
      />
    </div>
  );
};

export default FindST;
