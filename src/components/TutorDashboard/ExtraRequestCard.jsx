// // frontend/src/features/TutorDashboard/ExtraRequestCard.jsx
// import { useState } from "react";
// import { useUpdateExtraRequestStatusMutation } from "../../features/extraRequest/extraRequestApi";

// const ExtraRequestCard = ({ request }) => {
//   const [updateStatus, { isLoading }] = useUpdateExtraRequestStatusMutation();
//   const [status, setStatus] = useState(request.status);

//   const handleStatusChange = async (newStatus) => {
//     try {
//       await updateStatus({ id: request._id, status: newStatus }).unwrap();
//       setStatus(newStatus);
//     } catch (err) {
//       console.error("Failed to update status:", err);
//       alert("Failed to update status. Try again.");
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border-l-4 border-blue-500">
//       <div className="flex justify-between items-center">
//         <h3 className="font-semibold text-lg">
//           {request.student.name ? request.student.name[0] + "***" : "Anonymous"}
//         </h3>
//         <span
//           className={`px-2 py-1 rounded text-sm font-semibold ${
//             status === "pending"
//               ? "bg-yellow-100 text-yellow-800"
//               : status === "accepted"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {status}
//         </span>
//       </div>

//       <p className="text-gray-600">
//         Course: {request.course.name} ({request.course.code})
//       </p>
//       <p className="text-gray-600">
//         Requested Time: {new Date(request.requestedTime).toLocaleString()}
//       </p>

//       {status === "pending" && (
//         <div className="flex gap-2 mt-2">
//           <button
//             onClick={() => handleStatusChange("accepted")}
//             disabled={isLoading}
//             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
//           >
//             Approve
//           </button>
//           <button
//             onClick={() => handleStatusChange("rejected")}
//             disabled={isLoading}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//           >
//             Reject
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExtraRequestCard;



// frontend/src/features/TutorDashboard/ExtraRequestCard.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateExtraRequestStatusMutation } from "../../features/extraRequest/extraRequestApi";

const ExtraRequestCard = ({ request }) => {
  const [updateStatus, { isLoading }] = useUpdateExtraRequestStatusMutation();
  const [status, setStatus] = useState(request.status);
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateStatus({ id: request._id, status: newStatus }).unwrap();
      setStatus(newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status. Try again.");
    }
  };

  const handleViewProfile = () => {
    navigate(`/profile/${request.student._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-2 border-l-4 border-blue-500">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{request.student.name}</h3>
        <span
          className={`px-2 py-1 rounded text-sm font-semibold ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : status === "accepted"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="text-gray-600">
        Course: {request.course.name} ({request.course.code})
      </p>
      <p className="text-gray-600">
        Requested Time: {new Date(request.requestedTime).toLocaleString()}
      </p>

      <div className="flex gap-2 mt-2">
        {status === "pending" && (
          <>
            <button
              onClick={() => handleStatusChange("accepted")}
              disabled={isLoading}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange("rejected")}
              disabled={isLoading}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Reject
            </button>
          </>
        )}
        <button
          onClick={handleViewProfile}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ExtraRequestCard;
