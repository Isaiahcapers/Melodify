import '../CSS/Body.css';
import Header from './Header';
import Banner from '../assets/images/Melodify-Banner.webp'
import { UseDataLayerValue } from '../DataLayer';
import Tracks from './Tracks';

interface BodyProps {
  tracks: any[];
  // Define any props if needed in the future
}

function Body({tracks}: BodyProps) {
  const [{user,token},dispatch] = UseDataLayerValue();
 const onSelectTrack = (track: any) => {
  console.log("Selected Track", onSelectTrack);
  
    console.log(`Selected Track ID: ${track.id}`);
    dispatch({ type: "SET_PLAYING", playing: true });
    dispatch({ type: "SET_SELECTED_TRACK", selectedTrack: track }); // Dispatch the new action 
    }; 
  
    const playSong = async (trackId: string) => {
      try {
        const result = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (!result.ok) {
          console.error("Failed to fetch track info:", result.statusText);
          return;
        }
  
        const data = await result.json();
        console.log("Track Info", data);
  
        // Dispatch the SET_SONG action with the fetched song data
        dispatch({ type: "SET_SONG", song: data });
      } catch (error) {
        console.error("Error fetching track info:", error);
      }
    };
  


  return (
    <div className ="page">
      <div>
      <Header />
      <div className="banner">
        <div>
          
        </div>
        <img src={Banner} alt="Banner" className="banner-img"/>
        <div className="banner-message">
         <h2 className='WelcomeMessage'>Welcome, {user?.display_name} </h2>
       <p className='PlaylistMessage'>Pick a Playlist & Melodify</p> 
        </div>
      </div>
      <div className="body-playlist-area">
        {tracks?.map((item: { track: { id: string; name: string; artists: any[]; album: any } }) => (
            <Tracks key={item.track.id} track={item.track} playSong={playSong} onSelectTrack={onSelectTrack} />
        ))}
      </div>
      </div>
      
    </div>
  );
}

export default Body;
