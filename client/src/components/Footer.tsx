import '../CSS/Footer.css';
import { Shuffle,PlayCircle,ArrowRightCircle,ArrowLeftCircle,ArrowClockwise } from 'react-bootstrap-icons';

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer-details">
                <p>details</p>
            </div>
            <div className="footer-controls">
                <Shuffle />
                <ArrowLeftCircle />
                <PlayCircle fontSize="large"/>
                <ArrowRightCircle />
                <ArrowClockwise />
            </div>
            <div className="footer-volume">
                <p>volume</p>
            </div>
        </footer> 
    );
}
