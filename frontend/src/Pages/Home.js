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
                        <p>Made by (exhausted) Bruins for Bruins</p>
                        <button className="cta-button" onClick={scrollToFeatures}>Get Started</button>
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
                            <h3>If you're not a UCLA student</h3>
                            <p>Why are you here?</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;