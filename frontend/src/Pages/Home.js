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
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>Welcome to the UCLA Roommate Finder</h1>
                        <p>Made by (exhausted) UCLA students</p>
                        <button className="cta-button">Find people now</button>
                    </div>
                </section>

                {/* Quick Features Section */}
                <section className="features">
                    <h2>Why Choose Us?</h2>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <h3>Because we are cool</h3>
                            <p>Access insights and resources to navigate your journey.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Same</h3>
                            <p>Connect with like-minded individuals and mentors.</p>
                        </div>
                        <div className="feature-card">
                            <h3>Same</h3>
                            <p>See the difference in your progress and growth.</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Home;