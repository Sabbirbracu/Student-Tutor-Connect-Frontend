// src/pages/StudentDashboard.jsx
import React from "react";
import WelcomeSection from "../components/StudentDashboard/WelcomeSection";
import MyCourses from "../components/StudentDashboard/MyCourses";
import PendingAssignments from "../components/StudentDashboard/PendingAssignments";
import CompletedLessons from "../components/StudentDashboard/CompletedLessons";
import RecentActivity from "../components/StudentDashboard/RecentActivity";
import Notifications from "../components/StudentDashboard/Notifications";

const StudentDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <WelcomeSection enrolledCount={5} /> {/* Real data later */}
        <MyCourses />
        <PendingAssignments />
        <CompletedLessons />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <Notifications />
        <RecentActivity />
      </div>
    </div>
  );
};

export default StudentDashboard;
