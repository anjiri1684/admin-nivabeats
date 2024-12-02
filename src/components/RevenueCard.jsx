import { useEffect, useState } from "react";
// import api from "../api";
import axios from "axios";

const RevenueCard = () => {
  const [revenue, setRevenue] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const { data } = await axios.get(
          "https://www.api.nivabeats.com/admin/revenue"
        );
        console.log(data); // Log response data
        setRevenue(data.totalRevenue || 0);
      } catch (err) {
        console.error(err); // Log the error in the console
        setError("Error fetching revenue.");
      }
    };

    fetchRevenue();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">Total Revenue</h3>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-2xl">${(revenue / 100).toFixed(2)}</p>
      )}
    </div>
  );
};

export default RevenueCard;
