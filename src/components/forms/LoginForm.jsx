import { useState } from "react";
import { useLoginUserMutation } from "../../services/api";

const LoginForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password }).unwrap();
      console.log("Login response:", res); // For debugging

      // Save token
      localStorage.setItem("token", res.token);

      // Optional: Save user info
      localStorage.setItem("user", JSON.stringify({
        _id: res._id,
        name: res.name,
        email: res.email,
        role: res.role
      }));

      onClose(); // Close modal
    } catch (err) {
      console.error("Login failed:", err);
      alert(err?.data?.message || "Login failed");
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

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">
          {error.data?.message || "Login failed"}
        </p>
      )}

      <p className="text-center text-gray-500 text-sm mt-2">
        Don't have an account?{" "}
        <span
          className="text-[#1d4ed8] font-medium cursor-pointer"
          // You can add an onClick to open signup modal
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
