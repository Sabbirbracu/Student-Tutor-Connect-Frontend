import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 bg-neutral-light">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
