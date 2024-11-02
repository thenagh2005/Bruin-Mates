// src/LandingPage.js
import React, { useState } from 'react';
import '../Styles/Home.css';

import NavBar from '../NavBar';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        alert(`Searching for: ${searchTerm}`);
    };

    return (
        <>
        <NavBar />
        <div className="landing-container">
            
            <div className="hero-section">
                <h1 className="welcome-message">Welcome to the UCLA Roommate Finder</h1>

                <a href="/login"><button type="go-to-login" className="search-button">Login Now</button></a>

                <a href="/login"><button type="go-to-login" className="search-button">Create Account</button></a>
                
            </div>
        </div>
        </>
    );
};

export default Home;