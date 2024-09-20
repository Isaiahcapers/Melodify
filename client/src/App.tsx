import React, { useEffect } from 'react';
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
import {UseDataLayerValue} from './DataLayer';
import { getAccessToken,fetchProfile } from './components/authUtils';
import { initialState } from './components/Reducer';



const App: React.FC = () => {
  const [{user,token}, dispatch] = UseDataLayerValue();
  
  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const clientId = import.meta.env.VITE_CLIENT_ID || '';
      const token = await getAccessToken(clientId, code);

      if (code) {

        dispatch({ type: "SET_ACCESS_TOKEN", token:code });

        await fetchProfile(token).then((user) => {
          dispatch({ type: "SET_USER", user });
        });
      }
    };

    fetchToken();
  }, [dispatch]);

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
