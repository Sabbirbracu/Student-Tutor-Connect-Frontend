const ReportsTable = ({ reports, loading, onReportAction }) => {
  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Reports</h2>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Reporter</th>
            <th className="border px-2 py-1">Reported User</th>
            <th className="border px-2 py-1">Reason</th>
            <th className="border px-2 py-1">Severity</th>
            <th className="border px-2 py-1">Action Taken</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              <td className="border px-2 py-1">{r.reporter?.name}</td>
              <td className="border px-2 py-1">{r.reportedUser?.name}</td>
              <td className="border px-2 py-1">{r.reason}</td>
              <td className="border px-2 py-1">{r.severity}</td>
              <td className="border px-2 py-1">{r.actionTaken}</td>
              <td className="border px-2 py-1 space-x-2">
                <button
                  className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 text-white text-xs"
                  onClick={() => onReportAction(r._id, "warning")}
                >
                  Warning
                </button>
                <button
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white text-xs"
                  onClick={() => onReportAction(r._id, "ban")}
                >
                  Ban
                </button>
                <button
                  className="bg-gray-400 px-2 py-1 rounded hover:bg-gray-500 text-white text-xs"
                  onClick={() => onReportAction(r._id, "none")}
                >
                  None
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
