import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Get user and actions
  const { login, loading, user } = useAuthStore();
  const syncCart = useCartStore((state) => state.syncCart);

  // --- THE FIX: Auto-Redirect when User state updates ---
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Attempt Login
    const success = await login(email, password);

    if (success) {
      // 2. Sync Cart
      await syncCart();
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold tracking-tighter mb-8 text-center uppercase">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="swiss-input"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="swiss-input"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="swiss-btn mt-4">
            {loading ? "Verifying..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-medium underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
