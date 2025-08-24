// frontend/src/features/TutorDashboard/WelcomeSection.jsx

const WelcomeSection = ({ enrolledCourses = 0 }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-2">
      <h2 className="text-xl font-bold">Welcome Back!</h2>
      <p className="text-gray-600">You have enrolled in {enrolledCourses} courses.</p>
    </div>
  );
};

export default WelcomeSection;
