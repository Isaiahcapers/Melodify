import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navigation'; 
import Login from './pages/Login'; 
import RegisterForm from './components/RegisterForm'; 
import ProtectedRoute from './components/ProtectedRoute'; 
import HomePage from './pages/Home'; 
import Playlist from './pages/Playlist';
import MelodifyCallback from './pages/MelodifyCallback'; 
import "./App.css"; 
import Home from './pages/Home';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className ="app-grid">
      <div className ="app-nav">
        <Navbar />
      </div>
      <div className="app-content">
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
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
