import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/auth/authApi";
import { setCredentials } from "../../features/auth/authSlice";

const SignupForm = ({ onClose, onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Simple email regex to validate Gmail addresses
  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid Gmail address");
      return;
    }

    try {
      const res = await register(form).unwrap();
      const user = { _id: res._id, name: res.name, email: res.email, role: res.role };
      dispatch(setCredentials({ token: res.token, user }));

      toast.success("Signup successful! Welcome!");
      onClose?.(); // close modal

      // Redirect to home page (if needed)
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error(err?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <label className="flex flex-col text-sm font-medium">
        Full Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="John Doe"
          required
          className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="example@gmail.com"
          required
          className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="••••••••"
          required
          className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Role
        <select
          name="role"
          value={form.role}
          onChange={onChange}
          className="mt-2 p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all text-gray-700"
        >
          <option value="student">Student</option>
          <option value="studentTutor">Student Tutor</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <button
        type="submit"
        className="mt-4 w-full py-4 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#10b981] text-white font-semibold text-lg hover:opacity-95 transition"
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Sign Up"}
      </button>

      <p className="text-center text-gray-500 text-sm mt-2">
        Already have an account?{" "}
        <span
          className="text-[#1d4ed8] font-medium cursor-pointer"
          onClick={onSwitchToLogin}
        >
          Sign In
        </span>
      </p>
    </form>
  );
};

export default SignupForm;
