import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const { data } = await axios.post(
        "https://niva-beats-backend.vercel.app/api/auth/login-admin",
        formData
      );

      // Save JWT token
      localStorage.setItem("authToken", data.token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "You are not registered as an Admin";
      setError(errorMessage);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {/* Display error message */}
        {error && (
          <p className="text-red-500 text-center mb-4" role="alert">
            {error}
          </p>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-all"
        >
          Login
        </button>

        {/* Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <Link to="/reset-password" className="hover:underline">
            Forgot Password?
          </Link>
          <Link to="/register-admin" className="hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
