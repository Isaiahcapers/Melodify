import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../CSS/Login.css"; // CSS for styling
import image1 from "../assets/images/melodify-logo2.png";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Define the track type based on actual API response
interface Track {
  id: string;
  name: string;
  popularity: number;
  album: {
    name?: string; // Make 'name' optional in case it's missing
    images: { url: string }[];
  };
  artists: { name: string }[];
}

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const isLoggedIn = !!localStorage.getItem("token");

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setMessage(null);
  };

  const handleRegisterSuccess = () => {
    setMessage("Registration successful! Please log in.");
    setIsRegister(false);
  };

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const artistId = "0TnOYISbd1XYRBk9myaseg"; // Correct artist ID
        const response = await fetch(`/api/melodify/top-tracks/${artistId}`);
        const data = await response.json();
        console.log("Top Tracks:", data); // Log API response
        setTopTracks(data.tracks || []);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };
    fetchTopTracks();
  }, []);

  const chartData = {
    labels: topTracks.map((track: Track) => track.name),
    datasets: [
      {
        label: "Popularity",
        data: topTracks.map((track: Track) => track.popularity),
        backgroundColor: "rgba(0, 128, 128, 0.6)",
        borderColor: "rgba(0, 128, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
      datalabels: {
        display: true,
        align: "end" as const, // Fixes the TypeScript issue
        anchor: "end" as const, // Fixes the TypeScript issue
        color: "rgba(0, 128, 128, 1)",
        formatter: (value: number) => value,
        font: { weight: "bold" as const }, // Ensure 'bold' is of the correct type
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          callback: function (value: any) {
            const track = topTracks[value];
            return track && track.name.length > 15
              ? `${track.name.substring(0, 15)}...`
              : track?.name;
          },
        },
      },
    },
  };

  console.log("Chart Data:", chartData); // Add this to check the chart data

  return (
    <div className="login-page-container">
      {/* Top Tracks Marquee Section */}
      <div className="top-tracks-marquee">
        <h3>Top Tracks</h3>
        <div className="marquee">
          <ul>
          {topTracks.length > 0 ? (
  topTracks.map((track: Track) => (
    <li key={track.id}>
      <strong>{track.name}</strong>
      <br /> {/* This forces the word "by" onto a new line */}
      <span className="track-by">by {track.artists[0].name}</span>
      {track.album.images[0] && (
        <img
          src={track.album.images[0].url}
          alt={`${track.album?.name || 'Unknown Album'} album cover`}
          width="150"
          className="album-image"
        />
      )}
      <span> - Popularity: {track.popularity}</span>
    </li>
  ))
) : (
  <li>No top tracks available.</li>
)}
          </ul>
        </div>
      </div>

      <div className="main-content">
        <div className="login-container">
          {isLoggedIn ? (
            <div className="logged-in-message">
              <h2>You are Logged in!</h2>
              <p>
                Click <Link to="/home">Here</Link> to check out your Home page.
              </p>
            </div>
          ) : (
            <>
              <h2>{isRegister ? "Register Page" : "Melodify"}</h2>
              <img
                src={image1}
                alt="Melodify Logo"
                className="logo"
              />
              {message && <p className="message">{message}</p>}
              <div>
                {isRegister ? (
                  <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
                ) : (
                  <LoginForm />
                )}
                <button className="toggle-button" onClick={toggleForm}>
                  {isRegister
                    ? "Already have an account? Login"
                    : "New user? Register"}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="chart-container">
          <h3>Popularity Chart</h3>
          <Bar
            data={chartData}
            options={chartOptions}
            height={300}
            width={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
