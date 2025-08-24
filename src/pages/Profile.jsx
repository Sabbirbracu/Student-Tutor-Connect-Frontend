import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/cards/reviewCard";
import ReviewModal from "../components/ui/ReviewModal";
import { useGetTutorReviewsQuery, useGetUserByIdQuery } from "../services/baseApi";

const Profile = () => {
  const { id } = useParams();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch the user by ID
  const { data: user, isLoading, error } = useGetUserByIdQuery(id);

  // Fetch tutor reviews if user is a studentTutor
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useGetTutorReviewsQuery(user?._id, { skip: !user || user.role !== "studentTutor" });

  console.log("Profile.jsx - URL id:", id);
  console.log("Profile.jsx - user data:", user);
  console.log("Profile.jsx - loading:", isLoading, "error:", error);
  console.log("Profile.jsx - reviews data:", reviewsData);

  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to fetch profile.</p>;
  if (!user) return <p className="text-center mt-10 text-gray-500">User not found.</p>;

  const { name, role, bio, avatar } = user;

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      {/* Profile Image */}
      <div className="flex flex-col items-center text-center">
        <img
          src={avatar || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
        />

        {/* Name & Role */}
        <h1 className="text-2xl font-bold mt-4">{name}</h1>
        <p className="text-gray-500 text-sm">{role}</p>

        {/* Bio */}
        {bio && <p className="text-gray-600 mt-3 px-4 text-center">{bio}</p>}

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          {role?.toLowerCase() === "studenttutor" && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setShowReviewModal(true)}
            >
              Write Review
            </button>
          )}

          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Report
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {role?.toLowerCase() === "studenttutor" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Reviews</h2>

          {reviewsLoading && <p>Loading reviews...</p>}
          {reviewsError && <p className="text-red-500">Failed to load reviews.</p>}
          {!reviewsLoading && reviewsData?.reviews?.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {!reviewsLoading &&
            reviewsData?.reviews?.map((review, index) => (
              <ReviewCard key={review._id} review={review} index={index} />
            ))}
        </div>
      )}

      {/* Review Modal */}
      {role?.toLowerCase() === "studenttutor" && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          tutor={user}
        />
      )}
    </section>
  );
};

export default Profile;
