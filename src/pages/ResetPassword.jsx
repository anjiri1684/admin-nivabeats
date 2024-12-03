import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // Log the data being sent for debugging
      console.log("Sending request with:", { email, password });

      const response = await axios.post(
        "https://niva-beats-backend.vercel.app//api/auth/admin-reset-password",
        { email, password, confirmPassword } // Ensure both password and confirmPassword are sent
      );

      // Check if the response contains the expected message
      if (response.status === 200) {
        setMessage(response.data.message || "Password updated successfully.");
      } else {
        setMessage("Something went wrong.");
      }

      console.log("Response:", response); // Log response for debugging
    } catch (error) {
      // Handle error responses, including network issues
      console.error("Request failed with error:", error);

      // Check if error response exists
      if (error.response) {
        setMessage(error.response.data.message || "Something went wrong.");
      } else {
        setMessage("Request failed. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto text-white mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Reset Your Password
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-2 p-3 w-full border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-2 p-3 w-full border rounded-md"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-white"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-2 p-3 w-full border rounded-md"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default ResetPassword;
