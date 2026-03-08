import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthSlice } from "../store/slices/authSlice.js";
import AuthLayout from "../components/AuthLayout.jsx";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const { loading, error, isAuthenticated, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name: fullName, email, password, role }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (isAuthenticated) {
      toast.success(message);
      navigate("/dashboard");
      dispatch(resetAuthSlice());
    }
  }, [error, isAuthenticated, message, navigate, dispatch]);

  return (
    <AuthLayout
      title="Sign Up"
      subtitle="Please provide your information to sign up."
      leftPrompt="Already have Account? Sign in now."
      leftLinkText="SIGN IN"
      leftLinkTo="/login"
    >
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
        />
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <div className="relative">
          <select
            className="h-10 w-full appearance-none rounded border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <option value="User">📖 Reader</option>
            <option value="Admin">📚 Librarian (Admin)</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 h-10 w-full rounded bg-black text-xs font-semibold tracking-[0.18em] text-white disabled:bg-slate-400"
          disabled={loading}
        >
          {loading ? "SIGNING UP..." : "SIGN UP"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Register;
