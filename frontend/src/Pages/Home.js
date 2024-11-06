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
            <div className="landing-page">
                {/* Abstract Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>Welcome to the UCLA Roommate Finder</h1>
                        <p>Made by (exhausted) Bruins for Bruins</p>
                        <button className="cta-button">Get Started</button>
                    </div>
                    <div className="abstract-shapes">
                        <div className="circle"></div>
                        <div className="triangle"></div>
                        <div className="rectangle"></div>
                    </div>
                </section>

                {/* Abstract Features Section */}
                <section className="features">
                    <div className="features-header">
                        <h2>Why Choose Us?</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <h3>Expert Guidance</h3>
                            <p>Access insights and resources to navigate your journey.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Community Support</h3>
                            <p>Connect with fellow Bruins, alumni, and mentors.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Real Results</h3>
                            <p>Track your progress and celebrate your achievements.</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;