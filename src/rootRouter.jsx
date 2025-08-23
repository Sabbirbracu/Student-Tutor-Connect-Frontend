import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

// Pages

import HomePage from "./pages/HomePage.jsx";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Protected Route */}
      {/* <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
};

export default RootRouter;
