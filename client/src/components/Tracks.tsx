import React from 'react';

interface Artist {
  name: string;
}

interface Album {
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
}

interface TracksProps {
  track: Track;
  playSong: (id: string) => void;
}

const Tracks: React.FC<TracksProps> = ({ track, playSong }) => {
  console.log("Tracks");

  return (
    <div className="track" onClick={() => playSong(track.id)}>
      <img className="track-album" src={track.album.images[0].url} alt="" />
      <div className="track-info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
};

export default Tracks;