import React, { useState } from 'react';
import '../Styles/NavBar.css'

import { useAuth } from '../AuthContext';

import axios from "axios";


function NavBar() {
    const { isLoggedIn, login, logout } = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:4000/api/v1/user/logout',
                {}, // No data to send in the body
                {
                    withCredentials: true, // Include cookies if needed
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (response.status === 200) {
                console.log('Logout successful:', response.data.message);
                // Handle post-logout actions, e.g., clear state or redirect
                
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Logout failed:', error.response.status, error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received:', error.request);
            } else {
                // Something else happened
                console.error('Error setting up request:', error.message);
            }
        }

        logout();
        console.log("logged out!");
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