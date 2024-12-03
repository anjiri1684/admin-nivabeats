import axios from "axios";

const api = axios.create({
  baseURL: "https://niva-beats-backend.vercel.app",
});

// Request Interceptor: Attach token to Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error); // Pass the error down
  }
);

// Response Interceptor: Handle token expiration or other errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized or token expired. Redirecting to login...");
      // Clear token and redirect to login
      localStorage.removeItem("authToken");
      window.location.href = "/login"; // Redirect to login page
    } else if (error.response?.status === 500) {
      alert("Internal Server Error. Please try again later.");
    }
    return Promise.reject(error); // Pass the error down
  }
);

export default api;
