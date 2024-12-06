import '../Styles/Profile.css'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import VerifyLoggedIn from '../Components/VerifyLoggedIn.js';

import axios from "axios";

const ViewProfile = () => {
    const sleepyTimes = ['6 PM - 8 PM',
                                '8 PM - 10 PM',
                                '10 PM - 12 AM',
                                '12 AM - 2 AM',
                                "Other" ];

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
    const [currUser, setCurrUser] = useState([]);
    const [cleanliness, setCleanliness] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [smoking, setSmoking] = useState(null);
    const [alcohol, setAlcohol] = useState(null);
    const [genderInclusivity, setGenderInclusivity] = useState(null);
    const [roomType, setRoomType] = useState("");
    const [building, setBuilding] = useState("");
    const [occupancy, setOccupancy] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [age, setAge] = useState("");
    const [biography, setBiography] = useState("");
    const [gender, setGender] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const getCurrUser = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/curr-user", {
                    withCredentials: true, // This ensures cookies are sent with the request
                });

                setCurrUser(response.data.user);
                setCleanliness(response.data.user.preferences.cleanliness);
                setSleepTime(sleepyTimes[parseInt(response.data.user.preferences.sleepTime, 10)-1]);
                setSmoking(response.data.user.preferences.smoking);
                setAlcohol(response.data.user.preferences.alcohol);
                setGenderInclusivity(response.data.user.preferences.genderInclusivity);
                setRoomType(response.data.user.preferences.roomType);
                setBuilding(response.data.user.preferences.building);
                setOccupancy(response.data.user.preferences.occupancy);
                setFirstName(response.data.user.profileInfo.profileName.firstName);
                setLastName(response.data.user.profileInfo.profileName.lastName);
                setAge(response.data.user.profileInfo.age);
                setBiography(response.data.user.profileInfo.biography);
                setGender(response.data.user.profileInfo.gender);
                setPronouns(response.data.user.profileInfo.pronouns);


                localStorage.setItem("username", response.data.user.name);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        getCurrUser();
    }, [isLoggedIn]);

    let fullName= firstName.concat(" ",lastName);

    return (
        <>
            <VerifyLoggedIn>
                <div className='prof-container'>
                    <div onClick={() => {
                        setClicked(!clicked);}}
                        className={`prof-card ${clicked ? 'clicked' : ''}`}>
                    {!clicked && <div className='front'>
                        <img className="profile-picture" src={
                                currUser.profilePicture ||
                                'https://upload.wikimedia.org/wikipedia/commons/1/14/9-94702_user-outline-icon-clipart-png-download-profile-icon.png'
                            }
                            // style={{ width: '5vw', minWidth: '100px' }} alt="pfp" 
                            />
                            <h1>{firstName ? fullName : ""}</h1>
                            <h2>{currUser.name ? `@${currUser.name}` : ""}</h2>
                            <p></p>
                            <h2>{age ? "Age: " + age : ""}</h2>
                            <h2>{biography ? "Biography: " + biography : ""}</h2>
                            <h2>{gender ? "Gender: " + gender : ""}</h2>
                            <h2>{pronouns ? "Preferred Pronouns: " + pronouns : ""}</h2>
                            <h2>{currUser.preferences ? "" : "Click on the card to edit your profile."}</h2>
                    </div>}
                    {clicked && <div className='preferences'>
                        <h1>Preferences</h1>
                        
                        <h2>{cleanliness ? "Cleanliness: " + cleanliness : ""}</h2>

                        <h2>{sleepTime ? "Preferred Sleeping Time: " + sleepTime : ""}</h2>

                        <h2>{smoking != null ? "Smoking: " + (smoking ? "Yes" : "No") : ""}</h2>

                        <h2>{alcohol != null ? "Alcohol: " + (alcohol ? "Yes" : "No") : ""}</h2>

                        <h2>{genderInclusivity != null ? "Gender-Inclusive Housing: " + (genderInclusivity ? "Yes" : "No") : ""}</h2>

                        <h2>{roomType ? "Room Type: " + roomType : ""}</h2>

                        <h2>{building ? "Building: " + building : ""}</h2>

                        <h2>{occupancy ? "Occupancy: " + occupancy : ""}</h2>
                        
                        <a href="/profile-form">Edit your profile</a>
                    </div>}
                    </div>
                </div>
            </VerifyLoggedIn>
        </>
    )
}

export default ViewProfile;