// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { useActOnReportMutation, useGetReportsQuery } from "../features/report/reportApi";
import { useGetUsersQuery } from "../features/users/userApi";
import { useGetCoursesQuery, useGetTutorsQuery } from "../services/baseApi";

import ReportsTable from "../components/AdminDashboard/ReportsTable";
import StatsCards from "../components/AdminDashboard/StatsCard";
import UsersTable from "../components/AdminDashboard/UsersTable";

const AdminDashboard = () => {
  // Fetch data
  const { data: users = [], isLoading: usersLoading } = useGetUsersQuery();
  const { data: courses = [], isLoading: coursesLoading } = useGetCoursesQuery();
  const { data: tutors = [], isLoading: tutorsLoading } = useGetTutorsQuery();
  const { data: reports = [], isLoading: reportsLoading } = useGetReportsQuery();
  const [actOnReport] = useActOnReportMutation();

  // Local state for optimistic UI updates on blocked status
  const [usersState, setUsersState] = useState([]);

  useEffect(() => {
    if (users) setUsersState(users);
  }, [users]);

  // Stats
  const totalUsers = usersState.length;
  const totalTutors = tutors.length;
  const totalCourses = courses.length;
  const totalReports = reports.length;

  // Handle report actions (warning, ban, none)
  const handleReportAction = async (reportId, action, reportedUserId) => {
    try {
      await actOnReport({ reportId, action }).unwrap();
      alert("Action performed successfully!");

      // Optimistically update usersState blocked status
      if (action === "ban") {
        setUsersState((prev) =>
          prev.map((u) =>
            u._id === reportedUserId ? { ...u, blocked: true } : u
          )
        );
      } else if (action === "none") {
        setUsersState((prev) =>
          prev.map((u) =>
            u._id === reportedUserId ? { ...u, blocked: false } : u
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert("Failed to perform action.");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen space-y-8">
      {/* Stats Cards */}
      <StatsCards
        totalUsers={totalUsers}
        totalTutors={totalTutors}
        totalCourses={totalCourses}
        totalReports={totalReports}
      />

      {/* Users Table */}
      <UsersTable users={usersState} loading={usersLoading} />

      {/* Reports Table */}
      <ReportsTable
        reports={reports}
        loading={reportsLoading}
        onReportAction={handleReportAction}
      />
    </div>
  );
};

export default AdminDashboard;
