import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Courses from "./pages/Courses.jsx";

// Public pages
import HomePage from "./pages/HomePage.jsx";

// Dashboard placeholders
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentTutorDashboard from "./pages/StudentTutorDashboard.jsx";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout.jsx";

/**
 * RequireAuth
 * Redirects to home with optional login modal trigger if user is not authenticated
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
 * Checks if current user role is allowed for this route
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

      {/* Protected routes with sidebar layout */}
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

        {/* Student Tutor routes */}
        <Route
          path="/dashboard/tutor"
          element={
            <RequireRole roles={["studentTutor"]}>
              <StudentTutorDashboard />
            </RequireRole>
          }
        />
      </Route>

      {/* Fallback 404 redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RootRouter;
