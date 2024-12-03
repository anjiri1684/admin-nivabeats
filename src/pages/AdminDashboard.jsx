import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BeatList from "../components/BeatList";
import Spinner from "../components/Spinner";
import axios from "axios";

const AdminDashboard = () => {
  const [revenue, setRevenue] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No token found in local storage");
        }

        console.log("Sending token:", token);

        const { data } = await axios.get(
          "https://niva-beats-backend.vercel.app/api/beats/admin/revenue",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API response data:", data); // Log response data
        setRevenue(data.totalRevenue / 100); // Adjust if revenue is in cents
      } catch (err) {
        console.error("Error fetching revenue:", err.response || err.message);
        setError(`Unable to fetch revenue. Please try again. ${err.message}`);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 bg-[#001a33]">
        <h2 className="text-3xl font-bold mb-4 text-white">Dashboard</h2>
        <div className="bg-gray-800 p-6 rounded-lg mb-6 text-white">
          <h3 className="text-xl mb-2">Total Revenue</h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : revenue === null ? (
            <Spinner />
          ) : (
            <p className="text-2xl">${revenue.toFixed(2)}</p>
          )}
        </div>
        <BeatList />
      </div>
    </div>
  );
};

export default AdminDashboard;
