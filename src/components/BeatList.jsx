/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../api";
import BeatCard from "../components/BeatCard";

const BeatList = () => {
  const [beats, setBeats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBeats = async () => {
      try {
        const { data } = await api.get("/api/beats"); // Fetch all beats from the backend
        setBeats(data);
      } catch (err) {
        setError("Error fetching beats.");
      }
    };

    fetchBeats();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-white">Beat List</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-6">
        {beats.map((beat) => (
          <div key={beat._id} className="w-full lg:w-1/3">
            <BeatCard beat={beat} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeatList;
