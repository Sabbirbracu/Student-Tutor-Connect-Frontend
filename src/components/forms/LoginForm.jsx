// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useLoginMutation } from "../../features/auth/authApi"; // adjust path if needed
// import { setCredentials } from "../../features/auth/authSlice";

// const LoginForm = ({ onClose, onSuccess, onSwitchToSignup }) => {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [login, { isLoading, error }] = useLoginMutation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
//       // shape user for slice (matches your backend payload)
//       const user = { _id: res._id, name: res.name, email: res.email, role: res.role };
//       dispatch(setCredentials({ token: res.token, user })); // persisted by your slice
//       onSuccess?.(user);
//       onClose?.(); // close modal
//     } catch (err) {
//       console.error("Login failed:", err);
//       // optional toast; keeping inline message
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
//       <label className="flex flex-col text-sm font-medium">
//         Email
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="example@email.com"
//           required
//           className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
//         />
//       </label>

//       <label className="flex flex-col text-sm font-medium">
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="••••••••"
//           required
//           className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
//         />
//       </label>

//       <button
//         type="submit"
//         className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#10b981] text-white font-semibold text-lg hover:opacity-95 transition"
//         disabled={isLoading}
//       >
//         {isLoading ? "Signing in..." : "Sign In"}
//       </button>

//       {(error?.data?.message || error) && (
//         <p className="text-red-500 text-sm text-center mt-2">
//           {error?.data?.message || "Login failed"}
//         </p>
//       )}

//       <p className="text-center text-gray-500 text-sm mt-2">
//         Don't have an account?{" "}
//         <span
//           className="text-[#1d4ed8] font-medium cursor-pointer"
//           onClick={onSwitchToSignup}
//         >
//           Sign Up
//         </span>
//       </p>
//     </form>
//   );
// };

// export default LoginForm;


import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

const LoginForm = ({ onClose, onSwitchToSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      const user = { _id: res._id, name: res.name, email: res.email, role: res.role };
      dispatch(setCredentials({ token: res.token, user }));

      toast.success("Login successful! Redirecting...");
      onClose?.();

      // Redirect based on role
      setTimeout(() => {
        if (user.role === "admin") navigate("/dashboard/admin");
        else if (user.role === "student") navigate("/dashboard/student");
        else if (user.role === "studentTutor") navigate("/dashboard/tutor");
      }, 500); // slight delay for toast to show
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
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

      <button
        type="submit"
        className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#10b981] text-white font-semibold text-lg hover:opacity-95 transition"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-gray-500 text-sm mt-2">
        Don't have an account?{" "}
        <span
          className="text-[#1d4ed8] font-medium cursor-pointer"
          onClick={onSwitchToSignup}
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
