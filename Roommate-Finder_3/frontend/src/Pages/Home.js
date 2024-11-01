// src/LandingPage.js
import React, { useState } from 'react';
import '../Home.css';

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
                <h1>Welcome to the UCLA Roommate Finder</h1>
                <p>Find your best roommate</p>
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Search</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default Home;