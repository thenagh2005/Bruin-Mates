import React from 'react';
import '../Styles/NavBar.css';
import { useAuth } from '../AuthContext';
import { useTheme } from './ThemeContext'; // Import the ThemeContext
import axios from "axios";

function NavBar() {
    const { isLoggedIn, logout } = useAuth();
    const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

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
            }
        } catch (error) {
            if (error.response) {
                console.error('Logout failed:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
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
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/messages">Matches</a></li>
                        <li><a href="/view-profile">Profile</a></li>
                        <li><a href="/find">Find People</a></li>
                        <li className="align-right">
                            <a href="/" onClick={handleLogout}>Logout</a>
                        </li>
                    </>
                ) : (
                    <>
                        <li><a href="/"> Home </a></li>
                        <li><a href="/about">About</a></li>
                        <li className="align-right"><a href="/signup">Sign Up</a></li>
                        <li className="align-right"><a href="/login">Login</a></li>
                    </>
                )}
                {/* Theme Toggle Button (Appears in Both States) */}
                <li className="align-right">
                    <button className="link-button" onClick={toggleTheme}>
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
