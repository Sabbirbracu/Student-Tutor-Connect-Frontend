const ReviewCard = ({ review, index }) => {
  const { review: reviewText, course, createdAt } = review;

  // Generate anonymized student name
  const studentName = `Student #${index + 1}`;

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-800 font-semibold">{studentName}</h3>
        <span className="text-gray-400 text-sm">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-gray-700 mb-2">{reviewText}</p>

      {course && (
        <span className="text-sm text-gray-500">
          Course: {course.name} ({course.code})
        </span>
      )}
    </div>
  );
};

export default ReviewCard;
