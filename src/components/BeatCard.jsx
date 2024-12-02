/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaDownload,
  FaList,
  FaLink,
} from "react-icons/fa";
import axios from "axios";

const BeatCard = ({ beat }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const wavesurferRef = useRef(null);
  const waveformRef = useRef(null);

  // Initialize WaveSurfer
  useEffect(() => {
    if (beat?.audioFile) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "violet",
        progressColor: "purple",
        height: 80,
      });

      wavesurferRef.current.load(beat.audioFile);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [beat]);

  const handlePlayPause = () => {
    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFavorite = async () => {
    try {
      setIsFavorite(!isFavorite);
      await axios.post(`/api/favorites/${beat.id}`, {
        isFavorite: !isFavorite,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleDownload = async () => {
    try {
      // Make a request to the backend to get the download URL for the beat
      const response = await axios.get(`/api/download/${beat.id}`);

      // Use the download URL to trigger the file download
      const downloadUrl = response.data.downloadUrl;

      // Create an anchor element and simulate a click to download the file
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = beat.name; // Optional: set a filename for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading beat:", error);
    }
  };

  const handleAddToPlaylist = async () => {
    try {
      await axios.post(`/api/playlist/add`, { beatId: beat.id });
      alert("Added to playlist!");
    } catch (error) {
      console.error("Error adding to playlist:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + "/beats/" + beat.id);
    alert("Link copied!");
  };

  return (
    <div className="beat-card p-4 bg-gray-800 text-white rounded-lg shadow-lg flex flex-row items-center">
      {/* Beat Image */}
      <div className="beat-image w-24 h-24 mr-4">
        <img
          src={beat?.image || "default-image-url"}
          alt="Beat Cover"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Beat Info */}
      <div className="beat-info flex-1">
        <h3 className="text-xl font-semibold">{beat.name}</h3>
        <p className="text-sm text-gray-400">{beat.artist}</p>
        <p className="text-xs text-gray-500">
          {beat.genre} | {beat.bpm} BPM
        </p>
      </div>

      {/* Waveform */}
      <div
        ref={waveformRef}
        className="waveform w-48 h-12 bg-gray-700 rounded-lg"
      ></div>

      {/* Controls */}
      <div className="beat-controls flex justify-end space-x-3">
        <button onClick={handlePlayPause} className="p-2 rounded-full">
          {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} />}
        </button>
        <button
          onClick={handleFavorite}
          className={`p-2 rounded-full ${
            isFavorite ? "text-yellow-500" : "text-gray-500"
          }`}
        >
          <FaHeart size={18} />
        </button>
        <button
          onClick={handleAddToPlaylist}
          className="p-2 rounded-full text-blue-500"
        >
          <FaList size={18} />
        </button>
        <button
          onClick={handleDownload}
          className="p-2 rounded-full text-green-500"
        >
          <FaDownload size={18} />
        </button>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full text-gray-400"
        >
          <FaLink size={18} />
        </button>
      </div>
    </div>
  );
};

export default BeatCard;
