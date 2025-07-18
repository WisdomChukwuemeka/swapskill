import { useNavigate, Link } from "react-router-dom";
import { AuthAPI } from "../services/api";
import { useState } from "react";
export const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setcredentials((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    try {
      const response = await AuthAPI.login(credentials);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem(
        "is_superuser",
        JSON.stringify(response.data.user.is_superuser)
      );
      setSuccess(response.data.message);
      setTimeout(() => setSuccess(""), 2000);
      const role = localStorage.getItem("role");
      const is_superuser = JSON.parse(localStorage.getItem("is_superuser"));
      if (role === "create") {
  navigate("/dashboard");
  window.location.reload();
} else if (role === "offer") {
  navigate("/");
  window.location.reload();
}

      onLogin(response.data.user);
    } catch (error) {
      setError(
        error.response?.data?.email?.[0] || error.response?.data?.password?.[0]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="m-10  flex  justify-center bg-black px-4">
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-8 md:p-12 text-white">
          <div class="flex flex-col">
            <i className="bi bi-circle-half text-2xl md:text-4xl mb-3 font-bold text-center"></i>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Swapskill
            </h2>
          </div>

          {success && (
            <div className="text-green-600 text-center">{success}</div>
          )}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>

            {/* {Password} */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 flex justify-center items-center gap-2 
    ${
      loading
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700"
    }
    rounded-md text-white font-semibold transition-colors`}
            >
              {loading && <i className="bi bi-arrow-repeat animate-spin"></i>}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Extra link */}
          <p className="text-center text-sm mt-6 text-white/70">
            Don't have an account?{" "}
            <Link to="/registration" class="text-green-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
