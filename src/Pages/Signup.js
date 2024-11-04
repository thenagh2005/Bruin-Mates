import React, { useState } from 'react';

import NavBar from '../NavBar'

import '../Styles/Login.css'

function Login() {
    return (
        <>
            <NavBar />
            
            <div className='container'>
                <div className='header'>
                    <div className='text'>Create Your Account</div>
                    <div className='underline'></div>
                    
                </div>
                <div className='inputs'>
                    <div className = 'input'>
                        <input type="Email" placeholder='Email Address'/>

                    </div>
                    <div className = 'input'>
                        <input type="Username" placeholder='Username'/>

                    </div>
                    <div className = 'input'>
                        <input type="Password" placeholder='Password'/>

                    </div>

                </div>
                <div className='submit-container'>
                    <button type="Sign Up" className="submit">Sign Up</button>
                </div>
            </div>
            
        </>
    )
}

export default Login;