import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Courses from "./pages/Courses.jsx";
import FindST from "./pages/FindSt.jsx";
import HomePage from "./pages/HomePage.jsx";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentTutorDashboard from "./pages/StudentTutorDashboard.jsx";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

// Profile Page
import ConsultationPage from "./pages/ConsultationPage.jsx";
import Profile from "./pages/Profile.jsx"; // New Profile component

/**
 * RequireAuth
 */
const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/?auth=login" replace state={{ from: location }} />;
  }

  return children;
};

/**
 * RequireRole
 */
const RequireRole = ({ roles = [], children }) => {
  const role = useSelector((state) => state.auth.user?.role);

  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RootRouter = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<HomePage />} />

      {/* Protected routes with Dashboard layout */}
      <Route
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        {/* Admin routes */}
        <Route
          path="/dashboard/admin"
          element={
            <RequireRole roles={["admin"]}>
              <AdminDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/courses"
          element={
            <RequireRole roles={["admin"]}>
              <Courses />
            </RequireRole>
          }
        />

        {/* Student routes */}
        <Route
          path="/dashboard/student"
          element={
            <RequireRole roles={["student"]}>
              <StudentDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/dashboard/student/findST"
          element={
            <RequireRole roles={["student"]}>
              <FindST />
            </RequireRole>
          }
        />

        {/* Student Tutor routes */}
        <Route
          path="/dashboard/tutor"
          element={
            <RequireRole roles={["studentTutor"]}>
              <StudentTutorDashboard />
            </RequireRole>
          }
        />

        {/* Student Tutor routes */}

        <Route
          path="/dashboard/tutor/consultation"
          element={
            <RequireRole roles={["studentTutor"]}>
              < ConsultationPage />
            </RequireRole>
          }
        />
        <Route
          path="/dashboard/tutor/profile"
          element={
            <RequireRole roles={["studentTutor"]}>
              {/* Placeholder page for Tutor Profile */}
              <div className="p-6">Tutor Profile Page - Under Construction</div>
            </RequireRole>
          }
        />

        {/* Dynamic Profile route (For any authenticated user) */}
        <Route path="/profile/:id" element={<Profile />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RootRouter;
