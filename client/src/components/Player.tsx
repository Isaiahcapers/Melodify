import "../CSS/Player.css";
import React, { useState, useEffect } from "react";
import { UseDataLayerValue } from '../DataLayer';

const Player = () => {
    const [{song}] = UseDataLayerValue();
    const [player, setPlayer] = useState(undefined);


    



    return (
        <div className="player">
            <div className="player-body">
                <img className="player-album" src={song?.album.images[0].url} alt="" />
                <div className="player-info">
                    <h1>{song?.name}</h1>
                    <p>
                        {song?.artists.map((artist) => artist.name).join(", ")} -{" "}
                        {song?.album.name}
                    </p>
                </div>
            </div>

        </div>
    );
};
export default Player;