import { useState } from "react";
import { useCreateReviewMutation, useGetCoursesQuery } from "../../services/baseApi";
import Button from "./Button";

const ReviewModal = ({ isOpen, onClose, tutor }) => {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [reviewText, setReviewText] = useState("");

  const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
  const [createReview, { isLoading: submitting }] = useCreateReviewMutation();

  if (!isOpen || !tutor) return null;

  // Filter courses assigned to the tutor
  const assignedCourses = courses?.filter(
    (course) =>
      Array.isArray(tutor.coursesAssigned) &&
      tutor.coursesAssigned.some(
        (assigned) => assigned._id.toString() === course._id.toString()
      )
  );

  const handleSubmit = async () => {
    if (!selectedCourseId || !reviewText.trim()) return;

    try {
      await createReview({
        studentTutor: tutor._id,
        course: selectedCourseId,
        review: reviewText,
      }).unwrap();

      alert("Review submitted successfully!");
      setSelectedCourseId("");
      setReviewText("");
      onClose();
    } catch (err) {
      console.error("Review submit error:", err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Write Review for {tutor.name}</h2>

        {coursesLoading ? (
          <p className="text-center text-gray-500 mb-4">Loading courses...</p>
        ) : (
          <>
            <label className="block mb-2 font-semibold">Select Course</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <option value="">Select course</option>
              {assignedCourses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name} ({course.code})
                </option>
              ))}
            </select>
          </>
        )}

        <label className="block mb-2 font-semibold">Your Review</label>
        <textarea
          className="w-full border border-gray-300 rounded p-2 mb-4"
          rows={4}
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <Button
          size="sm"
          variant="gradient"
          onClick={handleSubmit}
          disabled={!selectedCourseId || !reviewText.trim() || submitting}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewModal;
