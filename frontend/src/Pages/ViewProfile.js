import React, { useEffect, useState } from 'react';
import '../Styles/Profile.css'

import axios from "axios";

const ViewProfile = () => {
    const [profile, setProfile] = useState("");

    const [currUser, setCurrUser] = useState([]);
    const [cleanliness, setCleanliness] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    /*
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
            console.log(result);
            setProfile(result.user);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);*/

    useEffect(() => {
        const getCurrUser = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/curr-user", {
                    withCredentials: true, // This ensures cookies are sent with the request
                });

                setCurrUser(response.data.user);
                setCleanliness(response.data.user.preferences.cleanliness);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        getCurrUser();
    }, []);

    return (
        <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gridGap: 20, padding: 20 }}>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/9-94702_user-outline-icon-clipart-png-download-profile-icon.png" style={{ width: '5vw', minWidth: '100px' }} alt="pfp" />
                    <h1>Name</h1>
                    <h2>{currUser.name}</h2>
                    <p>Insert bio here.</p>
                </div>
                <div>
                    <h1>Preferences</h1>
                    
                    <h2>Cleanliness:</h2>
                    <p>{cleanliness}</p>

                    <h2>Preferred Sleeping Time:</h2>
                    <p>wat</p>
                    
                    <a href="/profile-form">Edit your profile</a>
                </div>
            </div>
        </>
    )
}

export default ViewProfile;