const WelcomeSection = ({ enrolledCount }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-xl font-bold">Welcome Back!</h2>
      <p className="text-gray-600 mt-2">
        You are enrolled in <span className="font-semibold">{enrolledCount}</span> courses.
      </p>
    </div>
  );
};

export default WelcomeSection;
