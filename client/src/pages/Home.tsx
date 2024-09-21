import React, { useState, useEffect } from 'react';
import Player from '../components/Player';
import {UseDataLayerValue } from '../DataLayer';
import '../CSS/Home.css';
import { fetchProfile,redirectToAuthCodeFlow,getAccessToken,populateUI } from '../components/authUtils';


const Home = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID || '';
    console.log(clientId);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
    console.log(code);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
    console.log(accessToken);
  
  const [{token}, dispatch] = UseDataLayerValue();
console.log(token);


  useEffect(() => {
    const handleAuth = async () => {
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const token = await getAccessToken(clientId, code);
        setAccessToken(token);
        dispatch({ type: "SET_ACCESS_TOKEN", token:code });

        const profile = await fetchProfile(token);
          dispatch({ type: "SET_USER", user:profile });
          console.log(profile);
          
        populateUI(profile);
        await fetchAndSetPlaylists(token);
        setLoading(false);
      }
    };
    handleAuth();
  }, [clientId, code]);



  async function fetchAndSetPlaylists(token: string) {
    const data = await getFeaturedPlaylist(token);
    setPlaylists(data.playlists.items);
  }
  
  async function getFeaturedPlaylist(token: string) {
    const result = await fetch("https://api.spotify.com/v1/browse/featured-playlists", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    return await result.json();
  }


  return (
    <>
    <div id="profile">
      <h1>Welcome to Melodify</h1>
      <h2>
        Logged in as <span id="displayName"></span>
      </h2>
      <span id="avatar"></span>
      <ul id='bio'>
        <li>Email: <span id="email"></span></li>
        <li>User Id: <span id="id"></span></li>
      </ul>
    </div>
    <div className ="">
      {/* to category display api call */}
      <h2>Featured Playlists</h2>
      <div id="featured-playlists">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {playlists.length > 0 ? (
                playlists.map((playlist: any) => (
                  <li key={playlist.id}>
                    <a href={playlist.external_urls.spotify}>{playlist.name}</a>
                  </li>
                ))
              ) : (
                <p>No playlists available.</p>
              )}
            </ul>
          )}
        </div>
  
    </div>
    </>
  );
};

export default Home;