import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
        
            if (isSignedIn) {
                return (<nav style={{display:'flex',justifyContent:'flex-end'}}>
            <a onClick={()=>onRouteChange('signin')} href="#" className='f3 link black underline-hover dim pa3 pointer' >Sign Out</a> 
            </nav>);
            }
             
                return ( 
                    <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <a onClick={()=>onRouteChange('signin')} href="#" className='f5 link black underline-hover dim pa3 pointer' >Sign In</a> 
            <a onClick={()=>onRouteChange('register')} href="#" className='f5 link black underline-hover dim pa3 pointer' >Register</a> 

            </nav>
            );
        
}

export default Navigation;