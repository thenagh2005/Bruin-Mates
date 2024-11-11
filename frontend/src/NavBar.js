import React, { useState } from 'react';
import './Styles/NavBar.css'

import { useAuth } from './AuthContext';


function NavBar() {
    const { isLoggedIn, login, logout } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };
    
    return (
        <div>
            <ul>

                {isLoggedIn ? (
                    <>
                        <li><a href="/view-profile">Messages</a></li>
                        <li><a href="/view-profile">Profile</a></li>
                        <li><a href="/find">Find People</a></li>
                        <li className='align-right'><a href="/" onClick={handleLogout}>Logout</a></li>
                    </>
                ) : (
                    <>
                    <li><a href="/"> Home </a></li>
                    <li><a href="/about">About</a></li>
                
                    <li className='align-right'><a href="/signup">Sign Up</a></li>
                    <li className='align-right'><a href="/login">Login</a></li>
                    </>
                )}

            </ul>
        </div>

    );
}

export default NavBar;