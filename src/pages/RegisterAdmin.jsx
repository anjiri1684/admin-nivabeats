import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://niva-beats-backend.vercel.app/api/auth/register-admin",
        {
          email,
          password,
        }
      );

      setMessage(response.data.message); // Display success message
      setEmail(""); // Clear the input fields
      setPassword("");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Error registering admin. Please try again.";
      setError(errorMsg); // Display backend error or generic error
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register Admin</h2>
        {message && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 bg-gray-700 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-3 bg-gray-700 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 w-full py-2 rounded-lg hover:bg-blue-700"
        >
          Register Admin
        </button>

        {/* Link to Login */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterAdmin;
