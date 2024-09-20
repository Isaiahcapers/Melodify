// App.tsx
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navigation'; // Your navigation component
import Login from './pages/Login'; // Your login page component
import RegisterForm from './components/RegisterForm'; // Your register form component
import ProtectedRoute from './components/ProtectedRoute'; // Import the protected route component
import HomePage from './pages/Home'; // Assuming you have a HomePage component
import Playlist from './pages/Playlist'; // Assuming you have a Playlist component
import MelodifyCallback from './pages/MelodifyCallback'; // Corrected the import statement

import "./App.css"; // Assuming you have global styles here
import Home from './pages/Home';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        
        {/* Melodify OAuth callback route */}
        <Route path="/melodify-callback" element={<MelodifyCallback />} /> {/* Corrected route path */}

        {/* Protect the routes */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/playlist" element={<ProtectedRoute><Playlist /></ProtectedRoute>} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
