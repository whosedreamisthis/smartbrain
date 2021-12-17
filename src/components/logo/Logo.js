import React from 'react';
import Tilty from 'react-tilty';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
    return (
        
        <div className='Tilt bw2 br2 ma4 mt0'>
                <img className="Logo" src={brain} alt='logo'/>
        </div>
       
        // <div className="ma4 mt0" >
        // {/* <Tilty scale={1.2} max={25} perspective={1000}>
            
        // </Tilty>  */}
        // </div>
    )   
}

export default Logo;