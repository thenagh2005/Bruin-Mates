import React, { useState } from 'react';
import './Styles/NavBar.css' 

function NavBar() {
    return (
        <div>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/">Messages</a></li>
            </ul>
        </div>
        
    );
}

export default NavBar;