import React,{useState,useEffect} from 'react';
import '../CSS/Body.css';
import Header from './Header';
import Banner from '../assets/images/Melodify-Banner.webp'
import { UseDataLayerValue } from '../DataLayer';
import Tracks from './Tracks';
import Sidebar from './Sidebar';

function Body() {
  const [{user,token,playlist},dispatch] = UseDataLayerValue();
  const [tracks,setTracks] = useState<any[]>([]);

  const fetchTracks = async (playlistId: string) => {
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!result.ok) {
      console.error("Failed to fetch tracks:", result.statusText);
      return;
    }
    const data = await result.json();
    console.log("Tracks",data.items);
    
    setTracks(data.items);
  };

  const playSong = (trackId: string) => {
    console.log(`Playing song with ID: ${trackId}`);
    // Add your logic to play the song
  };


  return (
    <div className ="body">
      <div className="body-banner">
      <Header />
      <div className="banner">
        <img src={Banner} alt="Banner" className="banner-img"/>
        <div className="banner-message">
         <h2>Welcome, {user?.display_name} </h2>
       <p>Pick a Playlist & Melodify</p> 
        </div>
      </div>
      <div className="body-playlist-area">
        {playlist?.tracks.items.map((item: { track: { id: string; name: string; artists: any[]; album: any } }) => (
            <Tracks key={item.track.id} track={item.track} playSong={playSong} />
        ))}
      </div>
      </div>
      
    </div>
  );
}

export default Body;