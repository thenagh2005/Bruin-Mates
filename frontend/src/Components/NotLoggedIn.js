import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

// Code mostly adapted from VerifyLoggedIn.js
const NotLoggedIn = ({ children }) => { 
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    useEffect(() => { 
        if (isLoggedIn) 
            { navigate("/view-profile"); } }, [isLoggedIn, navigate]);
// Render nothing while redirecting 
    if (isLoggedIn) { return null; } 
// Render wrapped content 
    return <>{children}</>; };
    
export default NotLoggedIn;