import React, { useState } from 'react';
import './NavBar.css' 

function NavBar() {
    return (
        <div className = "navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">Login</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/">Messages</a></li>
            </ul>
        </div>
    );
}

export default NavBar