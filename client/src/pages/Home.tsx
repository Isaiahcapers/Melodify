import React, { useState, useEffect } from 'react';
import {UseDataLayerValue } from '../DataLayer';
import '../CSS/Home.css';
import { fetchProfile,redirectToAuthCodeFlow,getAccessToken,populateUI } from '../components/authUtils';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Footer from '../components/Footer';


const Home = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID || '';
    // console.log("I have a clientId",clientId);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
    // console.log("I have a code",code);
  // const [playlists, setPlaylists] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [accessToken, setAccessToken] = useState<string | null>(null);
    // console.log("I have and access token:",accessToken);
  
  const [{token}, dispatch] = UseDataLayerValue();
    console.log("token for datalayer",token);


  useEffect(() => {
    const handleAuth = async () => {
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const token = await getAccessToken(clientId, code);
        dispatch({ type: "SET_ACCESS_TOKEN", token });
        const profile = await fetchProfile(token);
        dispatch({ type: "SET_USER", user: profile });
      }
    };
    handleAuth();
  }, [clientId, code]);






  return (
    <div className="home">
    <div className="home-body">
      <Sidebar onSelectPlaylist={function (playlistId: string): void {
          throw new Error('Function not implemented.');
        } } />
      <Body />
      <Footer />
    </div>
    </div>
  );
};

export default Home;
