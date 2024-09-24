import React,{useState,useEffect} from 'react';
import '../CSS/Body.css';
import Header from './Header';
import Banner from '../assets/images/Melodify-Banner.webp'
import { UseDataLayerValue } from '../DataLayer';
import Tracks from './Tracks';
import Sidebar from './Sidebar';

interface BodyProps {
  tracks: any[];
  // Define any props if needed in the future
}

function Body({tracks}: BodyProps) {
  const [{user,token,playlists,playing,selectedTrack},dispatch] = UseDataLayerValue();
  // console.log("Reducer is receiving SET_PLAYING information", playing);
  // console.log("Selected Track", selectedTrack);
  // const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  console.log(tracks);
 const [trackInfo, setTrackInfo] = useState<any[]>([]);
 const onSelectTrack = (track: any) => {
    console.log(`Selected Track ID: ${track.id}`);
    dispatch({ type: "SET_PLAYING", playing: true });
    dispatch({ type: "SET_SELECTED_TRACK", selectedTrack: track }); // Dispatch the new action 
  } 

  const playSong = async (trackId: string) => {
    const result = await fetch (`
https://api.spotify.com/v1/tracks/${trackId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!result.ok) {
      console.error("Failed to fetch track info:", result.statusText);
      return;
    }
    const data = await result.json();
    console.log("Track Info", data);
    setTrackInfo(data.items);

    dispatch({ type: "SET_SONG", song: data });
     
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
        {tracks?.map((item: { track: { id: string; name: string; artists: any[]; album: any } }) => (
            <Tracks key={item.track.id} track={item.track} playSong={playSong} />
        ))}
      </div>
      </div>
      
    </div>
  );
}

export default Body;