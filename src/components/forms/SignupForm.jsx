import { useState } from "react";

const SignupForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      {/* Name */}
      <label className="flex flex-col text-sm font-medium">
        Full Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
        />
      </label>

      {/* Email */}
      <label className="flex flex-col text-sm font-medium">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          required
          className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
        />
      </label>

      {/* Password */}
      <label className="flex flex-col text-sm font-medium">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#10b981] text-white font-semibold text-lg hover:opacity-95 transition"
      >
        Sign Up
      </button>

      {/* Login link */}
      <p className="text-center text-gray-500 text-sm mt-2">
        Already have an account?{" "}
        <span className="text-[#1d4ed8] font-medium cursor-pointer">Sign In</span>
      </p>
    </form>
  );
};

export default SignupForm;


// import { useState } from "react";

// const SignupForm = ({ onSubmit }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit?.({ name, email, password });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-6 w-full max-w-2xl mx-auto" // Wider form
//     >
//       <div className="grid grid-cols-2 gap-6">
//         <label className="flex flex-col text-sm font-medium">
//           Full Name
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="John Doe"
//             required
//             className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] text-gray-700 transition-all"
//           />
//         </label>

//         <label className="flex flex-col text-sm font-medium">
//           Email
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="example@email.com"
//             required
//             className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] text-gray-700 transition-all"
//           />
//         </label>
//       </div>

//       <label className="flex flex-col text-sm font-medium">
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="••••••••"
//           required
//           className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] text-gray-700 transition-all"
//         />
//       </label>

//       <button
//         type="submit"
//         className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#10b981] text-white font-semibold text-lg hover:opacity-95 transition"
//       >
//         Sign Up
//       </button>

//       <p className="text-center text-gray-500 text-sm mt-2">
//         Already have an account?{" "}
//         <span className="text-[#1d4ed8] font-medium cursor-pointer">Sign In</span>
//       </p>
//     </form>
//   );
// };

// export default SignupForm;
