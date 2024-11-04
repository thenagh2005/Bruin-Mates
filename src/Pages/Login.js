import React, { useState } from 'react';

import NavBar from '../NavBar'

import '../Styles/Login.css'

function Login() {
    return (
        <>
            <NavBar />
            
            
            <div className='container'>
                <div className='header'>
                    <div className='text'>Login</div>
                    <div className='underline'></div>
                    
                </div>
                <div className='inputs'>
                    <div className = 'input'>
                        <input type="Username" placeholder='Username'/>

                    </div>
                    <div className = 'input'>
                        <input type="Password" placeholder='Password'/>

                    </div>

                </div>
                <div className='submit-container'>
                    <button type="Sign Up" className="submit">Sign Up</button>
                    <button type="Login" className="submit">Login</button>
                </div>
            </div>
            
        </>
    )
}

export default Login;