import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navigation'; 
import Login from './pages/Login'; 
import RegisterForm from './components/RegisterForm'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import HomePage from './pages/Home'; 
import Playlist from './pages/Playlist';
import MelodifyCallback from './pages/MelodifyCallback';
import Home from './pages/Home';
import { UseDataLayerValue } from './DataLayer';

const App: React.FC = () => {
  // Function to handle successful registration and redirect to login
  const handleRegisterSuccess = () => {
    window.location.href = "/login"; // Redirect to login page after successful registration
  };
  const [{playlists}] = UseDataLayerValue();

console.log("App page has access to the playlist",playlists);


  return (
    <div className="app-grid">
      <div className="app-nav">
        <Navbar />
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/melodify-callback" element={<MelodifyCallback />} />

          {/* Add a fallback route for unmatched paths */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/playlist"
            element={
              <ProtectedRoute>
                <Playlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
