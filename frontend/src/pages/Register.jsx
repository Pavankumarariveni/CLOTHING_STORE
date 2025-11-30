import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register, loading, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) navigate("/");
    else alert("Registration failed");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold tracking-tighter mb-8 text-center uppercase">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="swiss-input"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="swiss-input"
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
            />
          </div>
          <button type="submit" disabled={loading} className="swiss-btn mt-4">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
