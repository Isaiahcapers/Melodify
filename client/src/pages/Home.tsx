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
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
    // console.log("I have and access token:",accessToken);
  
  const [{token}, dispatch] = UseDataLayerValue();
    // console.log("token for datalayer",token);


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
          // console.log("profile info:",profile);
        populateUI(profile);
        await fetchAndSetPlaylists(token);
        setLoading(false);
      }
    };
    handleAuth();
  }, [clientId, code]);



  async function fetchAndSetPlaylists(token: string) {
    const data = await getFeaturedPlaylist(token);
    dispatch({ type: "SET_PLAYLISTS", playlists:playlists });
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
    <div className="home">
    {/* <div id="profile">
      <h1>Welcome to Melodify</h1>
      <h2>
        Logged in as <span id="displayName"></span>
      </h2>
      <span id="avatar"></span>
      <ul id='bio'>
        <li>Email: <span id="email"></span></li>
        <li>User Id: <span id="id"></span></li>
      </ul>
    </div> */}
    <div className="home-body">
      <Sidebar />
      <Body />
      <Footer />
    </div>
    {/* <div className ="playlistArea">
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
  
    </div>*/}
    </div>
  );
};

export default Home;