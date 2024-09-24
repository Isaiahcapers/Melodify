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
  const [{user,token,playlist},dispatch] = UseDataLayerValue();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  console.log(tracks);
  

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
        {tracks?.map((item: { track: { id: string; name: string; artists: any[]; album: any } }) => (
            <Tracks key={item.track.id} track={item.track} playSong={playSong} />
        ))}
      </div>
      </div>
      
    </div>
  );
}

export default Body;