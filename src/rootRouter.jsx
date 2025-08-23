import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Public
import HomePage from "./pages/HomePage.jsx";

// (Future) Protected pages — stub imports (create when ready)
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentTutorDashboard from "./pages/StudentTutorDashboard.jsx";

const RequireAuth = ({ children }) => {
  const token = useSelector((s) => s.auth.token);
  const location = useLocation();
  if (!token) {
    // send user home and trigger login modal via query param
    return <Navigate to="/?auth=login" replace state={{ from: location }} />;
  }
  return children;
};

const RequireRole = ({ roles = [], children }) => {
  const role = useSelector((s) => s.auth.user?.role);
  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const RootRouter = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />

      {/* Examples (uncomment when pages exist) */}
      
      <Route
        path="/dashboard/admin"
        element={
          <RequireAuth>
            <RequireRole roles={["admin"]}>
              <AdminDashboard />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/student"
        element={
          <RequireAuth>
            <RequireRole roles={["student"]}>
              <StudentDashboard />
            </RequireRole>
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/tutor"
        element={
          <RequireAuth>
            <RequireRole roles={["studentTutor"]}>
              <StudentTutorDashboard />
            </RequireRole>
          </RequireAuth>
        }
      />
      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RootRouter;
