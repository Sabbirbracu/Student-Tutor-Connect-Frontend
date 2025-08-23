import { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import CourseCard from "../components/cards/CourseCard";
import AssignTutorModal from "../components/ui/AssignTutorModal";
import Button from "../components/ui/Button";
import {
  useAssignTutorMutation,
  useGetCoursesQuery,
  useGetTutorsQuery,
} from "../services/baseApi";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalCourse, setModalCourse] = useState(null);

  // Fetch courses using RTK Query
  const { data: coursesData, isLoading } = useGetCoursesQuery();
  const courses = coursesData?.map((c) => ({ ...c, hasTutor: c.tutors?.length > 0 })) || [];

  // Fetch tutors only when modal opens
  const { data: tutorsData } = useGetTutorsQuery(undefined, {
    skip: !modalCourse, // skip until modal opens
  });

  const [assignTutor] = useAssignTutorMutation();

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignTutor = (course) => {
    setModalCourse(course);
  };

  const handleAssign = async (courseId, tutorId) => {
    try {
      await assignTutor({ courseId, tutorId }).unwrap();
      setModalCourse(null); // close modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-500 text-lg" />
        </div>

        <Button variant="gradient" className="flex items-center gap-2">
          <FiPlus className="text-xl" />
          Create Course
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p className="text-gray-500 col-span-full text-center">Loading...</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              onAssignTutor={handleAssignTutor}
              onViewDetails={() => {}}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No courses found.</p>
        )}
      </div>

      {/* Assign Tutor Modal */}
      {modalCourse && (
        <AssignTutorModal
          isOpen={!!modalCourse}
          onClose={() => setModalCourse(null)}
          course={modalCourse}
          tutors={tutorsData || []}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
};

export default Courses;
