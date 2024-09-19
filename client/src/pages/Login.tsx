import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../CSS/Login.css"; // CSS for styling

// Import chart.js components
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import for showing data labels above bars

// Register chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [topTracks, setTopTracks] = useState([]); // State for storing top tracks

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  // Function to fetch top tracks from Spotify API
  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch("/api/melodify/top-tracks/0TnOYISbd1XYRBk9myaseg"); // Replace with the actual API route
        const data = await response.json();
        setTopTracks(data.tracks || []);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    fetchTopTracks();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: topTracks.map((track: any) => track.name), // Song names as labels
    datasets: [
      {
        label: "Popularity",
        data: topTracks.map((track: any) => track.popularity), // Popularity values
        backgroundColor: "rgba(0, 128, 128, 0.6)", // Teal color for bars
        borderColor: "rgba(0, 128, 128, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options including rotated labels and showing popularity above bars
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Show tooltips on hover
      },
      datalabels: {
        display: true,
        align: "end",
        anchor: "end",
        color: "rgba(0, 128, 128, 1)", // Same color as the bar
        formatter: (value: number) => value, // Show the popularity number above bars
        font: {
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Rotate the labels slightly for better readability
          minRotation: 45, // Keep the rotation fixed
          callback: function(value: any, index: number, values: any) {
            const label = this.getLabelForValue(value);
            return label.length > 15 ? `${label.substring(0, 15)}...` : label; // Truncate long track names
          }
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Popularity",
        },
        ticks: {
          precision: 0, // Ensure no decimal values are shown on the y-axis
        },
      },
    },
  };

  return (
    <div className="login-page-container">
      {/* Top Tracks Marquee Section */}
      <div className="top-tracks-marquee">
        <h3>Top Tracks</h3>
        <div className="marquee">
          <ul>
            {topTracks.length > 0 ? (
              topTracks.map((track: any) => (
                <li key={track.id}>
                  <strong>{track.name}</strong> by {track.artists[0].name}
                  {/* Display album image if available */}
                  {track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt={`${track.album.name} album cover`}
                      width="50"
                      className="album-image" // Add a class for the bounce effect
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
        {/* Login Section */}
        <div className="login-container">
          <h2>{isRegister ? "Register Page" : "Melodify"}</h2>
          <img src="/src/assets/images/melodify-logo2.png" alt="Melodify Logo" className="logo" />
          <div>
            {/* Toggle between Login and Register forms */}
            {isRegister ? <RegisterForm /> : <LoginForm />}
            <button className="toggle-button" onClick={toggleForm}>
              {isRegister ? "Already have an account? Login" : "New user? Register"}
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-container">
          <h3>Popularity Chart</h3>
          <Bar data={chartData} options={chartOptions} height={300} width={500} />
        </div>
      </div>
    </div>
  );
};

export default Login;
