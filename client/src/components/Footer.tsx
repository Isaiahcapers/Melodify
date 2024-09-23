// import { useState } from 'react';
import '../CSS/Footer.css';

const handleClick = () => {

};


import '../CSS/Footer.css';
import { Shuffle,PlayCircle,ArrowRightCircle,ArrowLeftCircle,ArrowClockwise,VolumeUp,VolumeDown,VolumeMute } from 'react-bootstrap-icons';

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer-details">
                <img src="" alt="" className="footer-song-logo"/>
                <div className='footer-song-info'>
                <h5>Artist Name</h5>
                <p>details</p>
                </div>
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
        </footer> 
    );
}
