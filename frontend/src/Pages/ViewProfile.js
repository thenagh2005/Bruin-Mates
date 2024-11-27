import React, {useEffect, useState} from 'react';
import '../Styles/Profile.css'

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import VerifyLoggedIn from '../Components/VerifyLoggedIn.js';


const ViewProfile = () => {
    const [profile, setProfile] = useState("");
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Redirects user if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    // Gets profile data
    useEffect(() => {
        fetch('http://localhost:4000/api/v1/user/view-profile', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Ensures cookies are sent
        })
        .then(res =>{
            return res.json();
        })
        .then(result =>{
            setProfile(result);
        })
        .catch(error => {
            console.log(error);
        });
    }, [isLoggedIn]);

    // Render nothing while redirecting from useEffect()
    if (!isLoggedIn) {
        return null;
    }


    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
        <VerifyLoggedIn>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gridGap: 20, padding: 20}}>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/9-94702_user-outline-icon-clipart-png-download-profile-icon.png" style={{width: '5vw', minWidth: '100px'}} alt="pfp" />
                    <h1>Name</h1>
                    <h2>{profile.name ? `@${profile.name}` : ""}</h2>
                    <p>Insert bio here.</p>
                </div>
                <div>
                    <h1>Preferences</h1>
                </div>
            </div>
        </VerifyLoggedIn>
        </>
    )
}

export default ViewProfile;