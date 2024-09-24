import { useState } from 'react';
import '../CSS/Footer.css';
import { Shuffle,PlayCircle,ArrowRightCircle,ArrowLeftCircle,ArrowClockwise,VolumeUp,VolumeDown,VolumeMute } from 'react-bootstrap-icons';
import Tracks from './Tracks';
import { UseDataLayerValue } from '../DataLayer';

interface FooterProps {
    tracks: any[];
  }

export default function Footer() {
    const [{song}] = UseDataLayerValue();
console.log("footer",song);

    const [haikuPrompt, setHaikuPrompt] = useState(''); // State for user input (haiku topic)
    const [haiku, setHaiku] = useState(''); // State to store the generated haiku
    const [error, setError] = useState(''); // State for error handling

    // Function to handle haiku generation
    const generateHaiku = async () => {
        if (!haikuPrompt.trim()) {
            setError('Please enter a topic for the haiku.');
            return;
        }
        setError(''); // Clear previous error if any
        try {
            const response = await fetch('/api/openai/haiku', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: haikuPrompt }), // Pass the user input
            });

            if (!response.ok) {
                throw new Error('Failed to generate haiku');
            }

            const data = await response.json();
            setHaiku(data.haiku); // Store the returned haiku
        } catch (error) {
            setError('Error generating haiku. Please try again.');
            console.error('Error generating haiku:', error);
        }
    };

    return (
        <footer className="footer">
            <div className="footer-details">
        {song ? (
          <>
            <img src={song.album.images[0].url} alt={song.name} className="footer-song-logo" />
            <div className="footer-song-info">
              <h5>{song.name}</h5>
              <p>{song.artists.map((artist: any) => artist.name).join(', ')}</p>
            </div>
          </>
        ) : (
          <div className="footer-song-info">
            <h5>No track selected</h5>
          </div>
        )}
      </div>
            <div className="footer-controls">
                <Shuffle className="footer-icon"/>
                <ArrowLeftCircle className="footer-icon" />
                <PlayCircle className="footer-icon" />
                <ArrowRightCircle className="footer-icon" />
                <ArrowClockwise className="footer-icon" />
            </div>
            <div className="footer-volume">
                <VolumeMute/>
                <VolumeDown/>
                <VolumeUp/>
            </div>
            <div className="haiku-container">
                <div className="api-button">
                    <h2 className="haiku-title">Ask me anything about music!</h2>
                    <input
                        type="text"
                        className="haiku-input"
                        placeholder="Enter a haiku topic"
                        value={haikuPrompt}
                        onChange={(e) => setHaikuPrompt(e.target.value)}
                    />
                    
                    {/* Button to generate haiku */}
                    <button className="submit-button" onClick={generateHaiku}>
                        Generate Response
                    </button>
                </div>

                {/* Display the generated haiku on the right */}
                {haiku && (
                    <div className="haiku-result">
                        <h3>AI Results:</h3>
                        <p>{haiku}</p>
                    </div>
                )}
            </div>

            {/* Display error if any */}
            {error && <p className="error-message">{error}</p>}
        </footer>
    );
}






