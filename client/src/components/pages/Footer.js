import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='p text-center'>
            <div className="bg-green">
                <p >
                
                    <Link to='/welcome'>Home</Link> |
                    <Link to='/about'>About</Link> |
                    <Link to='/login'>Login</Link> |
                    <Link to='/signup'>Sign Up</Link> 
                    
                </p>
                <br />
            </div>
        
            <div className="footer-bg">
                <p> <strong> READINCOM: Live Dep in progress version </strong> </p>
                <p>Powered by Nawill IT Solutions</p>
            </div>
             
        </div>
    )
}
export default Footer;