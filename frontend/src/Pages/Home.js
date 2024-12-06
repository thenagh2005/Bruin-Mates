// src/LandingPage.js
import React, { useState } from 'react';

import { useRef } from 'react';
import '../Styles/Home.css';


const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const featuresRef = useRef(null);

    const scrollToFeatures = () => {
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        alert(`Searching for: ${searchTerm}`);
    };

    return (
        <>
            <div className="landing-page">
                {/* Abstract Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>Welcome to the UCLA Roommate Finder</h1>
                        <p>Made by Bruins for Bruins</p>
                        <button className="cta-button" onClick={scrollToFeatures}>Get Started</button>
                    </div>
                    <div className="info-card">
                        <h2>Explore More</h2>
                        <p>Discover roommates, connect with students, and join a thriving community.</p>
                        <a href="/about">Learn More</a>
                    </div>
                    <div className="abstract-shapes">
                        <div className="circle"></div>
                        <div className="triangle"></div>
                        <div className="rectangle"></div>
                    </div>
                </section>

                {/* Abstract Features Section */}
                <section className="features" ref={featuresRef}>
                    <div className="features-header">
                        <h2>How to get started</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <h3>If you have an account</h3>
                            <p>Go ahead and log in</p>
                            <a href="/login">Log in</a>
                        </div>
                        <div className="feature-card">
                            <h3>If you don't have an account</h3>
                            <p>Go ahead and sign up</p>

                            <a href="/signup">Sign Up</a>
                        </div>
                        <div className="feature-card">
                            <h3>Find your perfect Roommate today!</h3>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;