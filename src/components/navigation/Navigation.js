import React from 'react';

const Navigation = ({onRouteChange}) => {
        return (
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <a onClick={()=>onRouteChange('signin')} href="#" className='f3 link black underline-hover dim pa3 pointer' >Sign Out</a> 
            </nav>
        );
}

export default Navigation;