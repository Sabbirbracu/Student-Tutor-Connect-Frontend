// import { useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { logout } from "../../features/auth/authSlice";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);
//   const [isOpen, setIsOpen] = useState(false); // mobile only

//   // Define menu items per role
//   const menuItems = {
//     admin: [
//       { name: "Dashboard", path: "/dashboard/admin" },
//       { name: "See Report", path: "/see-report" },
//       { name: "Courses", path: "/courses" },
//       { name: "Assign ST", path: "/assign-st" },
//     ],
//     student: [
//       { name: "Dashboard", path: "/dashboard/student" },
//       { name: "Find ST", path: "/dashboard/student/findST" },
//     ],
//     studentTutor: [{ name: "Dashboard", path: "/dashboard/tutor" }],
//   };

//   const items = menuItems[user?.role] || [];

//   return (
//     <>
//       {/* Mobile top bar with hamburger (only on mobile) */}
//       <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow">
//         <h2 className="text-lg font-semibold tracking-wide">My App</h2>
//         <button
//           aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
//           onClick={() => setIsOpen((v) => !v)}
//           className="text-2xl"
//         >
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-xl transform transition-transform duration-300
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         md:translate-x-0 md:static md:block z-50`}
//       >
//         <div className="h-full flex flex-col p-6">
//           {/* Title (desktop + mobile) */}
//           <h2 className="hidden md:block text-3xl font-extrabold mb-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
//             My App
//           </h2>

//           {/* Navigation Items */}
//           <nav className="flex flex-col gap-2">
//             {items.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.path}
//                 onClick={() => setIsOpen(false)} // close on mobile after navigate
//                 className={({ isActive }) =>
//                   `block p-3 rounded-xl font-medium transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-600/90 text-white shadow"
//                       : "hover:bg-blue-600/70 hover:text-white"
//                   }`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Divider */}
//           <div className="mt-8 border-t border-white/20" />

//           {/* Logout Button */}
//           <button
//             onClick={() => {
//               setIsOpen(false);
//               dispatch(logout());
//             }}
//             className="mt-auto py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 font-semibold text-white transition-all duration-200 shadow"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;


import { useState } from "react";
import { FaBars, FaBell, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false); // mobile only

  // Define menu items per role
  const menuItems = {
    admin: [
      { name: "Dashboard", path: "/dashboard/admin" },
      { name: "See Report", path: "/see-report" },
      { name: "Courses", path: "/courses" },
      { name: "Assign ST", path: "/assign-st" },
    ],
    student: [
      { name: "Dashboard", path: "/dashboard/student" },
      { name: "Find ST", path: "/dashboard/student/findST" },
    ],
    // Inside menuItems object
    studentTutor: [
      { name: "Dashboard", path: "/dashboard/tutor" },
      { name: "Consultation", path: "/dashboard/tutor/consultation" },
      { name: "Profile", path: "/dashboard/tutor/profile" },
    ],

  };

  const items = menuItems[user?.role] || [];

  return (
    <>
      {/* Mobile top bar with hamburger (only on mobile) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow">
        <h2 className="text-lg font-semibold tracking-wide">My App</h2>
        <button
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setIsOpen((v) => !v)}
          className="text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white shadow-xl transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block z-50`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Title */}
          <h2 className="hidden md:block text-3xl font-extrabold mb-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            My App
          </h2>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // close on mobile
                className={({ isActive }) =>
                  `block p-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/90 text-white shadow"
                      : "hover:bg-blue-600/70 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Divider */}
          <div className="mt-8 border-t border-white/20" />

          {/* Bottom Section: Avatar + Notifications + Logout */}
          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              {/* Avatar */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=" + (user?.name || "U")
                  }
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white/40 object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{user?.name || "User"}</p>
                  <p className="text-xs text-blue-200 capitalize">{user?.role}</p>
                </div>
              </div>

              {/* Notifications */}
              <button className="relative text-xl hover:text-yellow-300 transition">
                <FaBell />
                <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1">
                  3
                </span>
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                dispatch(logout());
              }}
              className="py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 font-semibold text-white transition-all duration-200 shadow"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
