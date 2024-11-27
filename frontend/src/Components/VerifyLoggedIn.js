import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const VerifyLoggedIn = ({ children }) => { 
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    useEffect(() => { 
        if (!isLoggedIn) 
            { navigate("/login"); } }, [isLoggedIn, navigate]);
// Render nothing while redirecting 
    if (!isLoggedIn) { return null; } 
// Render wrapped content 
    return <>{children}</>; };
    
export default VerifyLoggedIn;

