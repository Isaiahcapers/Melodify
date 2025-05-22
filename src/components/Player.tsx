import "../CSS/Player.css";
import { UseDataLayerValue } from '../DataLayer';

const Player = () => {
    const [{song}] = UseDataLayerValue();


    



    return (
        <div className="player">
            <div className="player-body">
                <img className="player-album" src={song?.album.images[0].url} alt="" />
                <div className="player-info">
                    <h1>{song?.name}</h1>
                    <p>
                        {song?.artists.map((artist: { name: string }) => artist.name).join(", ")} -{" "}
                        {song?.album.name}
                    </p>
                </div>
            </div>

        </div>
    );
};
export default Player;