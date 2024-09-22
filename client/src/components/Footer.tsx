import '../CSS/Footer.css';
import { Shuffle,PlayCircle,ArrowRightCircle,ArrowLeftCircle,ArrowClockwise,VolumeUp,VolumeDown,VolumeMute } from 'react-bootstrap-icons';

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer-details">
                <img src="" alt="" />
                <div className='footer-song-info'>
                <h4></h4>
                <p>details</p>
                </div>
            </div>
            <div className="footer-controls">
                <Shuffle />
                <ArrowLeftCircle />
                <PlayCircle />
                <ArrowRightCircle />
                <ArrowClockwise />
            </div>
            <div className="footer-volume">
                <VolumeMute/>
                <VolumeDown/>
                <VolumeUp/>
            </div>
        </footer> 
    );
}
