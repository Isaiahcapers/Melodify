// import { useState } from 'react';
import '../CSS/Footer.css';

const handleClick = () => {

};


export default function Footer() {

    return (
        
        <footer className="footer">

            <div className="api-button">

                <button className='api-icon' onClick={handleClick}><img src="/src/assets/images/melodify-logo-2-button.png" alt="Melodify Logo API" /></button>
                
            </div>
            
        </footer>
       
    );
}
