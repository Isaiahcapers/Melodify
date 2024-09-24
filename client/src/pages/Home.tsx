import React, { useState, useEffect } from 'react';
import {UseDataLayerValue } from '../DataLayer';
import '../CSS/Home.css';
import { fetchProfile,redirectToAuthCodeFlow,getAccessToken,populateUI } from '../components/authUtils';
import Sidebar from '../components/Sidebar';
import Body from '../components/Body';
import Footer from '../components/Footer';


const Home = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID || '';
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
    // console.log("I have a code",code);
    // console.log("I have and access token:",accessToken);
    // console.log("I have a clientId",clientId);
  const [{token}, dispatch] = UseDataLayerValue();
    console.log("token for datalayer",token);
  const [tracks,setTracks] = useState<any[]>([]);


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
  
  const fetchTracks = async (playlistId: string) => {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=15`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!result.ok) {
      console.error("Failed to fetch tracks:", result.statusText);
      return;
    }
    const data = await result.json();
    console.log("this is the playlist id",playlistId);
    
    console.log("Tracks",data.items);
    
    setTracks(data.items);
  };

  const onSelectPlaylist = (playlistId: string) => {
    console.log(`Selected Playlist ID: ${playlistId}`);
    fetchTracks(playlistId);
    dispatch({ type: "SET_SELECTED_PLAYLIST_ID", selectedPlaylistId: playlistId });
  };





  return (
    <div className="home">
    <div className="home-body">
      <Sidebar onSelectPlaylist={ onSelectPlaylist} />
      <Body tracks={tracks}/>
      <Footer />
    </div>
    </div>
  );
};

export default Home;
