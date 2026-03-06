import { Link, useParams } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Please provide your information to reset password."
      leftPrompt="Already have Account? Sign in now."
      leftLinkText="SIGN IN"
      leftLinkTo="/login"
    >
      <form className="space-y-3">
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="password"
          placeholder="New Password"
          autoComplete="new-password"
        />
        <input
          className="h-10 w-full rounded border border-slate-300 px-3 text-sm outline-none focus:border-slate-400"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />

        <button
          type="button"
          className="mt-2 h-10 w-full rounded bg-black text-xs font-semibold tracking-[0.18em] text-white"
        >
          RESET
        </button>

        <div className="pt-2 text-center text-[10px] text-slate-400">
          {token}
        </div>

        <div className="pt-2 text-center text-xs text-slate-600">
          <Link to="/login" className="hover:underline">
            Back
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
