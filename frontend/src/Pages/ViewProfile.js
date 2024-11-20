import React, { useEffect, useState } from 'react';
import '../Styles/Profile.css'

import axios from "axios";

const ViewProfile = () => {
    const sleepyTimes = ['6 PM - 8 PM',
                                '8 PM - 10 PM',
                                '10 PM - 12 AM',
                                '12 AM - 2 AM',
                                "I'm Nocturnal HAHAHAHAHAHAHA" ];

    const [profile, setProfile] = useState("");

    const [currUser, setCurrUser] = useState([]);
    const [age, setAge] = useState("");
    const [cleanliness, setCleanliness] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [smoking, setSmoking] = useState(false);
    const [alcohol, setAlcohol] = useState(false);
    const [roomType, setRoomType] = useState("");
    const [building, setBuilding] = useState("");
    const [occupancy, setOccupancy] = useState("");
    
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
                setSleepTime(sleepyTimes[parseInt(response.data.user.preferences.sleepTime, 10)-1]);
                setAge(response.data.user.preferences.age);
                setSmoking(response.data.user.preferences.smoking);
                setAlcohol(response.data.user.preferences.alcohol);
                setRoomType(response.data.user.preferences.roomType);
                setBuilding(response.data.user.preferences.building);
                setOccupancy(response.data.user.preferences.occupancy);

                localStorage.setItem("username", response.data.user.name);
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
                    <h2>Age:</h2>
                    <p>{age}</p>
                    <p>Insert bio here.</p>
                </div>
                <div>
                    <h1>Preferences</h1>
                    
                    <h2>Cleanliness:</h2>
                    <p>{cleanliness}</p>

                    <h2>Preferred Sleeping Time:</h2>
                    <p>{sleepTime}</p>

                    <h2>Smoking:</h2>
                    <p>{smoking ? "Yes" : "No"}</p>

                    <h2>Alcohol:</h2>
                    <p>{alcohol ? "Yes" : "No"}</p>

                    <h2>Room Type:</h2>
                    <p>{roomType}</p>

                    <h2>Building:</h2>
                    <p>{building}</p>

                    <h2>Occupancy:</h2>
                    <p>{occupancy}</p>
                    
                    <a href="/profile-form">Edit your profile</a>
                </div>
            </div>
        </>
    )
}

export default ViewProfile;