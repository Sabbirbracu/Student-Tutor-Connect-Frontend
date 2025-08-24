// import { useState } from "react";
// import { FiMoreVertical } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import Button from "../ui/Button.jsx";

// const CourseCard = ({ course, onViewDetails, onAssignTutor }) => {
//   const user = useSelector((state) => state.auth.user);
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col relative hover:-translate-y-1 duration-300">
//       {/* Top-right Status / Menu */}
//     <div className="absolute top-2 right-3 flex items-center gap-2">
//         {/* Status Badge */}
//         {user?.role === "admin" && (
//             <span
//             className={`px-2 py-1 text-xs font-semibold rounded ${
//                 course.hasTutor ? "bg-green-500 text-white" : "bg-red-500 text-white"
//             }`}
//             >
//             {course.hasTutor ? "Assigned" : "Not Assigned"}
//             </span>
//         )}

//     {/* Three-dot menu */}
//     {user?.role === "admin" && (
//         <div className="relative">
//         <button
//             onClick={() => setShowMenu(!showMenu)}
//             className="p-1 rounded-full hover:bg-gray-200 transition"
//         >
//             <FiMoreVertical className="text-gray-700 font-bold text-lg" />
//         </button>
//         {showMenu && (
//             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
//             <button
//                 onClick={() => {
//                 onAssignTutor?.(course);
//                 setShowMenu(false);
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//             >
//                 Assign Tutor
//             </button>
//             </div>
//         )}
//         </div>
//     )}
//     </div>


//       {/* Course Image */}
//       <div className="h-40 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
//         {course.image ? (
//           <img
//             src={course.image}
//             alt={course.name}
//             className="object-cover w-full h-full"
//           />
//         ) : (
//           <div className="flex items-center justify-center text-white font-semibold">
//             <span className="text-lg">Course Image</span>
//           </div>
//         )}
//       </div>

//       {/* Course Info */}
//       <h3 className="text-lg font-bold text-neutral mb-2 line-clamp-2">
//         {course.name}
//       </h3>
//       <p className="text-gray-600 text-sm mb-4 line-clamp-3">
//         {course.description || "No description available."}
//       </p>

//       {/* View Details Button */}
//       <Button
//         variant="outline"
//         className="mt-auto w-full"
//         onClick={() => onViewDetails?.(course)}
//       >
//         View Details
//       </Button>
//     </div>
//   );
// };

// export default CourseCard;


import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import Button from "../ui/Button.jsx";

const CourseCard = ({ course, onViewDetails, onAssignTutor, onDeleteCourse }) => {
  const user = useSelector((state) => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      onDeleteCourse?.(course._id);
    }
    setShowMenu(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col relative hover:-translate-y-1 duration-300">
      
      {/* Top-right Status / Menu */}
      <div className="absolute top-2 right-3 flex items-center gap-2">
        
        {/* Status Badge */}
        {user?.role === "admin" && (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded ${
              course.hasTutor ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {course.hasTutor ? "Assigned" : "Not Assigned"}
          </span>
        )}

        {/* Three-dot menu */}
        {user?.role === "admin" && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-full hover:bg-gray-200 transition"
            >
              <FiMoreVertical className="text-gray-700 font-bold text-lg" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={() => {
                    onAssignTutor?.(course);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Assign Tutor
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                >
                  Delete Course
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Course Image */}
      <div className="h-40 w-full mb-4 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-400">
        {course.image ? (
          <img
            src={course.image}
            alt={course.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center text-white font-semibold">
            <span className="text-lg">Course Image</span>
          </div>
        )}
      </div>

      {/* Course Info */}
      <h3 className="text-lg font-bold text-neutral mb-2 line-clamp-2">
        {course.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {course.description || "No description available."}
      </p>

      {/* View Details Button */}
      <Button
        variant="outline"
        className="mt-auto w-full"
        onClick={() => onViewDetails?.(course)}
      >
        View Details
      </Button>
    </div>
  );
};

export default CourseCard;
