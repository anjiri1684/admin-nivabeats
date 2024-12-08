import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const AddBeatPage = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAudioChange = (e) => setAudioFile(e.target.files[0]);
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleAddBeat = async (e) => {
    e.preventDefault();

    if (!audioFile || !imageFile) {
      setError("Both audio and image files are required.");
      return;
    }

    // Validate price
    if (price <= 0) {
      setError("Price must be a positive value.");
      return;
    }

    const MAX_AUDIO_SIZE = 200 * 1024 * 1024;
    const MAX_IMAGE_SIZE = 200 * 1024 * 1024;

    if (audioFile.size > MAX_AUDIO_SIZE) {
      setError("Audio file is too large. Maximum size is 200MB.");
      return;
    }

    if (imageFile.size > MAX_IMAGE_SIZE) {
      setError("Image file is too large. Maximum size is 200MB.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("genre", genre);
      formData.append("artist", artist);
      formData.append("price", price);
      formData.append("audioFile", audioFile);
      formData.append("image", imageFile);

      const { data } = await axios.post(
        "https://niva-beats-backend.vercel.app/api/beats/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 10000,
        }
      );

      setMessage(data.message);
      resetForm();
      setError("");
    } catch (err) {
      console.error("Upload error:", err.message);
      setError(
        err.response?.data?.message || "Error adding beat. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setGenre("");
    setArtist("");
    setPrice("");
    setAudioFile(null);
    setImageFile(null);
  };

  const resetMessage = () => {
    setMessage("");
    setError("");
  };

  if (message || error) {
    setTimeout(resetMessage, 5000);
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Add Beat</h2>

        {/* Success or error messages */}
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Loading spinner or message */}
        {loading && <p className="text-blue-500">Uploading...</p>}

        <form className="bg-gray-800 p-6 rounded-lg" onSubmit={handleAddBeat}>
          <div className="mb-4">
            <label>Title</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label>Genre</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label>Artist</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 rounded"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label>Price</label>
            <input
              type="number"
              className="w-full p-2 bg-gray-700 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label>Audio File</label>
            <input
              type="file"
              className="w-full p-2 bg-gray-700 rounded"
              onChange={handleAudioChange}
              accept="audio/*"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label>Image File</label>
            <input
              type="file"
              className="w-full p-2 bg-gray-700 rounded"
              onChange={handleImageChange}
              accept="image/*"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 w-full py-2 rounded"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Beat"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBeatPage;
