// frontend/src/features/TutorDashboard/ExtraRequests.jsx
import { useGetTutorExtraRequestsQuery } from "../../features/extraRequest/extraRequestApi";
import ExtraRequestCard from "./ExtraRequestCard";

const ExtraRequests = () => {
  const { data: requests, isLoading, error } = useGetTutorExtraRequestsQuery();

  if (isLoading) return <p>Loading extra slot requests...</p>;
  if (error) return <p className="text-red-500">Failed to load requests.</p>;

  return (
    <div className="flex flex-col gap-4">
      {requests?.length === 0 ? (
        <p className="text-gray-500">No extra slot requests found.</p>
      ) : (
        requests.map((req) => <ExtraRequestCard key={req._id} request={req} />)
      )}
    </div>
  );
};

export default ExtraRequests;
