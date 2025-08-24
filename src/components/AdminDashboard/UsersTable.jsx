const UsersTable = ({ users, loading }) => {
  if (loading) return <p>Loading users...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Role</th>
            {/* <th className="border px-2 py-1">Blocked</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-2 py-1">{u.name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">{u.role}</td>
              {/* <td className="border px-2 py-1">{u.blocked ? "Yes" : "No"}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
