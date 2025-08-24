const StatsCards = ({ totalUsers, totalTutors, totalCourses, totalReports }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { title: "Users", value: totalUsers },
      { title: "StudentTutors", value: totalTutors },
      { title: "Courses", value: totalCourses },
      { title: "Reports", value: totalReports },
    ].map((card) => (
      <div key={card.title} className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-gray-500 text-sm">{card.title}</h3>
        <p className="text-2xl font-bold">{card.value}</p>
      </div>
    ))}
  </div>
);

export default StatsCards;
