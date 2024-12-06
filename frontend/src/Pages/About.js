import React from 'react';

import "../Styles/About.css"

function About() {
    return (
        <>
        <div>
            <section className="about-hero">
                <div className="hero-content">
                    <h1 class='header'>About Us</h1>
                    <p>We&apos;re here to help you find the perfect roommate at UCLA!</p>
                </div>
                <div className="abstract-shapes">
                    <div className="circle"></div>
                    <div className="triangle"></div>
                    <div className="rectangle"></div>
                </div>
            </section>
            <section className="welcome-message">
                <div className="welcome-header">
                    <h1 className='header'>Find Your Ideal UCLA Roommate Effortlessly</h1>
                    <p>
                        Our web application is designed to make finding the perfect 
                        roommate at UCLA an easy, interactive, and stress-free experience. 
                        Whether you're a current student or an incoming freshman, our platform 
                        connects you with compatible roommates based on shared preferences 
                        and lifestyle choices.
                    </p>
                </div>
            </section>
            <section className="why-choose-us">
                <div className="why-choose-us-header">
                    <h1 className='header'>Why Choose Us?</h1>
                    <p>
                        UCLA's existing roommate matching system is functional but lacks customization and depth. 
                        Our application bridges that gap with:
                    </p>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="list-group-item-icon">🌟</span> A personalized, user-friendly experience.
                        </li>
                        <li className="list-group-item">
                            <span className="list-group-item-icon">🤝</span> A platform to find roommates with compatible lifestyles.
                        </li>
                        <li className="list-group-item">
                            <span className="list-group-item-icon">📞</span> Enhanced communication tools for better roommate planning.
                        </li>
                    </ul>
                </div>
            </section>


            <section className="team-intro">
                <div className="team-header">
                    <h1 className='header'>Meet the Team</h1>
                    <p>
                        We are Team USC Trojans, a group of passionate UCLA students dedicated to solving
                        real-world problems with creative technology solutions.
                    </p>
                </div>
                <div className="team-members">
                    <div className="team-card">
                        <h2>Saatvik Sharma</h2>
                        <p>Project Manager & Backend Developer</p>
                    </div>
                    <div className="team-card">
                        <h2>Anagh Pandya</h2>
                        <p>Frontend Developer</p>
                    </div>
                    <div className="team-card">
                        <h2>Kaelan Thouati de Tazoult</h2>
                        <p>Backend Developer</p>
                    </div>
                    <div className="team-card">
                        <h2>Lune Chan</h2>
                        <p>Flex Developer</p>
                    </div>
                    <div className="team-card">
                        <h2>Lorenzo Bolls</h2>
                        <p>Flex Developer</p>
                    </div>
                </div>
            </section>


        </div>
        </>
    )
}

export default About;