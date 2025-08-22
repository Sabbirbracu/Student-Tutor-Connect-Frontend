// const FeatureCard = ({ icon, title, description }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start gap-3 hover:scale-105 transform transition-transform duration-300">
//       <div className="text-3xl">{icon}</div>
//       <h3 className="text-lg font-bold text-neutral">{title}</h3>
//       <p className="text-gray-600 text-sm">{description}</p>
//     </div>
//   );
// };

// export default FeatureCard;


const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 text-center hover:scale-105 transform transition-transform duration-300">
      {/* Decorative Icon Container */}
      <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-16 h-16 flex items-center justify-center rounded-full shadow-inner text-4xl text-indigo-600">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>

      {/* Optional Stars / Badge placeholder */}
      {/* <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div> */}
    </div>
  );
};

export default FeatureCard;
