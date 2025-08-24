import { useState } from "react";
import { useCreateReportMutation } from "../../features/report/reportApi";
import Button from "./Button";

const ReportModal = ({ isOpen, onClose, reportedUser }) => {
  const [reason, setReason] = useState("");
  const [severity, setSeverity] = useState("low");
  const [error, setError] = useState("");

  const [createReport, { isLoading }] = useCreateReportMutation();

  if (!isOpen || !reportedUser) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      setError("Please select a reason.");
      return;
    }

    try {
      await createReport({ reportedUser: reportedUser._id, reason, severity }).unwrap();
      alert("Report submitted successfully!");
      setReason("");
      setSeverity("low");
      onClose();
    } catch (err) {
      console.error("Failed to submit report:", err);
      alert("Failed to submit report.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Report {reportedUser.name}</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select reason</option>
              <option value="misbehavior">Misbehavior</option>
              <option value="spam">Spam</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium mb-1">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;
