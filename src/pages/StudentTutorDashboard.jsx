// frontend/src/pages/StudentTutorDashboard.jsx
import CompletedLessons from "../components/TutorDashboard/CompletedLessons";
import ExtraRequests from "../components/TutorDashboard/ExtraRequests";
import PendingAssignments from "../components/TutorDashboard/PendingAssignments";
import RecentActivity from "../components/TutorDashboard/RecentActivity";
import WelcomeSection from "../components/TutorDashboard/WelcomeSection";

const StudentTutorDashboard = () => {
  // Example: fetch number of enrolled courses dynamically later
  const enrolledCoursesCount = 4;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Welcome Section */}
        <WelcomeSection enrolledCourses={enrolledCoursesCount} />

        {/* Pending Assignments */}
        <PendingAssignments />

        {/* Completed Lessons */}
        <CompletedLessons />
      </div>

      {/* Extra Requests Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Extra Slot Requests</h2>
        <ExtraRequests />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <RecentActivity />
      </div>
    </div>
  );
};

export default StudentTutorDashboard;


