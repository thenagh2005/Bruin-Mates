import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ProfileForm.css';
import VerifyLoggedIn from '../Components/VerifyLoggedIn.js';


function ProfileForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        preferences: {
            cleanliness: null,
            sleepTime: null,
            smoking: null,
            alcohol: null,
            genderInclusivity: null,
            roomType: '',
            building: '',
            occupancy: '',
        },
        profileInfo: {
            profileName: {
                firstName: '',
                lastName: '',
            },
            biography: '',
            gender: '',
            pronouns: '', 
            age: ''
        }
    });

    const [buildingOptions, setBuildingOptions] = useState([]);

    const roomTypes = {
        classic: ['Sproul', 'Rieber', 'Hedrick', 'Dykstra'],
        deluxe: ['Holly', 'Gardenia', 'Cove', 'Landing', 'Olympic', 'Centennial'],
        plaza: [
            'Sunset Village',
            'Rieber Terrace',
            'Rieber Vista',
            'Hedrick Summit',
            'De Neve Plaza - Acacia',
            'De Neve Plaza - Birch',
            'De Neve Plaza - Cedar',
            'De Neve Plaza - Dogwood',
            'De Neve Plaza - Evergreen',
            'De Neve Plaza - Fir',
            'De Neve Plaza - Gardenia',
            'De Neve Plaza - Holly'
        ],
        suite: ['Saxon', 'Hitch'],
        'University Apartments': [
            'Gayley Court',
            'Gayley Towers',
            'Gayley Heights',
            'Glenrock',
            'Glenrock West',
            'Landfair',
            'Landfair Vista',
            'Levering Terrace',
            'Westwood Chateau',
            'Westwood Palm'
        ]
    };

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/user/curr-user', { withCredentials: true });
    
                const user = response.data.user;
    
                // Preprocess preferences to convert booleans and numbers to strings
                const formattedPreferences = Object.fromEntries(
                    Object.entries(user.preferences).map(([key, value]) => {
                        if (typeof value === 'boolean') {
                            return [key, value.toString()]; // Convert booleans to "true" or "false"
                        }
                        if (typeof value === 'number') {
                            return [key, value.toString()]; // Convert numbers to strings
                        }
                        return [key, value]; // Leave other values as is
                    })
                );
    
                setFormData({
                    ...user,
                    preferences: formattedPreferences,
                });
    
                if (user.preferences.roomType) {
                    setBuildingOptions(roomTypes[user.preferences.roomType] || []);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchUserData();
    }, []);
    
    const handleChange = (e, category) => {
        const { name, value, type, checked } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [name]: type === 'checkbox' ? checked : value,
            },
        }));
    };

    const handleNameChange = (e) => {
        const { name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            profileInfo: {
                ...prevData.profileInfo,
                profileName: {
                ...prevData.profileInfo.profileName,
                [name]: value,
                },
            },
        }));
    };

    const handleRoomTypeChange = (e) => {
        const selectedRoomType = e.target.value;
        setFormData((prevData) => ({
            ...prevData,
            preferences: {
                ...prevData.preferences,
                roomType: selectedRoomType,
            },
        }));
        setBuildingOptions(roomTypes[selectedRoomType] || []);
    };

    const handleProfilePictureChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            profilePicture: e.target.files[0], // Set the file object
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formDataToSend = new FormData();
    
            // Append profile picture
            if (formData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }
    
            // Append preferences
            for (const key in formData.preferences) {
                if (formData.preferences[key] !== null && formData.preferences[key] !== '') {
                    formDataToSend.append(`preferences[${key}]`, formData.preferences[key]);
                }
            }
    
            // Append profile info
            for (const key in formData.profileInfo) {
                if (formData.profileInfo[key] !== null && formData.profileInfo[key] !== '' && key != "profileName") {
                    formDataToSend.append(`profileInfo[${key}]`, formData.profileInfo[key]);
                } else if (key == "profileName") {
                    formDataToSend.append(`profileInfo[profileName][firstName]`, formData.profileInfo.profileName.firstName);
                    formDataToSend.append(`profileInfo[profileName][lastName]`, formData.profileInfo.profileName.lastName);
                    
                } 
            }
    
            // Send the request
            const response = await axios.post(
                'http://localhost:4000/api/v1/user/update-profile',
                formDataToSend,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                }
            );
    
            if (response.status === 200) {
                navigate('/view-profile');
                console.log('Profile updated successfully!');
            }
        } catch (error) {
            if (error.response) {
                alert(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('No response from the server. Please try again.');
            } else {
                console.error('Error:', error.message);
                alert('An error occurred. Please try again.');
            }
        }
    };
    
    
    

    return (
        <VerifyLoggedIn>
            <div className="form-container">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <h1 className="profile-header">Preferences:</h1>

                    {/* Profile Name */}
                    <h2>First Name*</h2>
                    <div className="inline-group radio-group">
                        <textarea
                            name="firstName"
                            value={formData.profileInfo?.profileName?.firstName || ""}
                            onChange={(e) => handleNameChange(e)}
                            placeholder="eg. Josie"
                            rows="1"
                            cols="25"
                        />
                    </div>
                    <h2>Last Name*</h2>
                    <div className="inline-group radio-group">
                        <textarea
                            name="lastName"
                            value={formData.profileInfo?.profileName?.lastName || ""}
                            onChange={(e) => handleNameChange(e)}
                            placeholder="Bruin"
                            rows="1"
                            cols="25"
                        />
                    </div>

                    {/* Cleanliness */}
                    <h2>How important is cleanliness to you? (1 is not important at all, 5 is very important)*</h2>
                    <div className="radio-group">
                        {[1, 2, 3, 4, 5].map((val) => (
                            <label key={val}>
                                <input
                                    type="radio"
                                    name="cleanliness"
                                    value={val.toString()}
                                    checked={formData.preferences.cleanliness === val.toString()}
                                    onChange={(e) => handleChange(e, "preferences")}
                                />
                                {val}
                            </label>
                        ))}
                    </div>

                    {/* Sleep Time */}
                    <h2>What time do you prefer to sleep?*</h2>
                    <div className="radio-group">
                        {['1', '2', '3', '4', '5'].map((val, idx) => (
                            <label key={idx}>
                                <input
                                    type="radio"
                                    name="sleepTime"
                                    value={val.toString()}
                                    checked={formData.preferences.sleepTime === val.toString()}
                                    onChange={(e) => handleChange(e, "preferences")} 
                                />
                                {val === '1'
                                    ? '6 PM - 8 PM'
                                    : val === '2'
                                    ? '8 PM - 10 PM'
                                    : val === '3'
                                    ? '10 PM - 12 AM'
                                    : val === '4'
                                    ? '12 AM - 2 AM'
                                    : "Other"}
                            </label>
                        ))}
                    </div>

                    {/* Smoking */}
                    <h2>Are you okay with smoking (any kind)?*</h2>
                    <div className="inline-group">
                        <label>
                            <input
                                type="radio"
                                name="smoking"
                                value="true"
                                checked={formData.preferences.smoking === "true"}
                                onChange={(e) => handleChange(e, "preferences")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="smoking"
                                value="false"
                                checked={formData.preferences.smoking === "false"}
                                onChange={(e) => handleChange(e, "preferences")}
                            />
                            No
                        </label>
                    </div>

                    {/* Alcohol */}
                    <h2>Are you okay with alcohol consumption?*</h2>
                    <div className="inline-group">
                        <label>
                            <input
                                type="radio"
                                name="alcohol"
                                value="true"
                                checked={formData.preferences.alcohol === "true"}
                                onChange={(e) => handleChange(e, "preferences")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="alcohol"
                                value="false"
                                checked={formData.preferences.alcohol === "false"}
                                onChange={(e) => handleChange(e, "preferences")}
                            />
                            No
                        </label>
                    </div>

                    {/* Gender Inclusivity */}
                    <h2>Are you looking for Gender Inclusive Housing?*</h2>
                    <div className="inline-group">
                        <label>
                            <input
                                type="radio"
                                name="genderInclusivity"
                                value="true"
                                checked={formData.preferences.genderInclusivity === "true"}
                                onChange={(e) => handleChange(e, "preferences")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="genderInclusivity"
                                value="false"
                                checked={formData.preferences.genderInclusivity === "false"}
                                onChange={(e) => handleChange(e, "preferences")}
                            />
                            No
                        </label>
                    </div>

                    {/* Room Type */}
                    <h2>Please select your room type*</h2>
                    <div className="radio-group">
                        {Object.keys(roomTypes).map((type) => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    name="roomType"
                                    value={type}
                                    checked={formData.preferences.roomType === type}
                                    onChange={handleRoomTypeChange}
                                />
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </label>
                        ))}
                    </div>

                    {formData.preferences.roomType && (
                        <>
                            {/* Building */}
                            <h2>Please select your building*</h2>
                            <div className="inline-group radio-group">
                                <select
                                    name="building"
                                    value={formData.preferences.building}
                                    onChange={(e) => handleChange(e, "preferences")}
                                >
                                    <option value="">-- Select a Building --</option>
                                    {buildingOptions.map((building) => (
                                        <option key={building} value={building}>
                                            {building}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        {/* Occupancy */}
                        <h2>Occupancy*</h2>
                        <div className="inline-group">
                            {(formData.preferences.roomType === 'University Apartments'
                                ? [
                                      { label: '4/4 Unit', value: '4/4' },
                                      { label: '4/8 Unit', value: '4/8' }
                                  ]
                                : [
                                      { label: 'Double', value: 'double' },
                                      { label: 'Triple', value: 'triple' }
                                  ]
                            ).map(({ label, value }) => (
                                <label key={value}>
                                    <input
                                        type="radio"
                                        name="occupancy"
                                        value={value}
                                        checked={formData.preferences.occupancy === value}
                                        onChange={(e) => handleChange(e, "preferences")}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </>
                )}

                    <h1 className="profile-header">About yourself:</h1>

                    {/* Biography */}
                    <h2>Tell us about yourself*</h2>
                    <div className="inline-group radio-group">
                        <textarea
                            name="biography"
                            value={formData.profileInfo.biography}
                            onChange={(e) => handleChange(e, "profileInfo")}
                            placeholder="Write your bio here..."
                            rows="4"
                            cols="50"
                            maxLength="200"
                        />
                    </div>

                    {/* Age */}
                    <h2>What is your age?*</h2>
                    <div className="inline-group radio-group">
                        <textarea
                            name="age"
                            value={formData.profileInfo.age}
                            onChange={(e) => handleChange(e, "profileInfo")}
                            placeholder="Enter your age here..."
                            rows="1"
                            cols="20"
                        />
                    </div>
                    {/* Gender */}
                    <h2>Gender*</h2>
                    <div className="inline-group radio-group">
                        <select
                            name="gender"
                            value={formData.profileInfo.gender}
                            onChange={(e) => handleChange(e, "profileInfo")}
                        >
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                    </div>

                    {/* Preferred Pronouns */}
                    <h2>Preferred Pronouns</h2>
                    <div className="inline-group radio-group">
                        <textarea
                            name="pronouns"
                            value={formData.profileInfo.pronouns}
                            onChange={(e) => handleChange(e, "profileInfo")}
                            placeholder="e.g., he/him, she/her, they/them"
                            rows="1"
                            cols="25"
                            maxLength="20"
                        />
                    </div>
                    {/* Profile Picture */}
                    <h2>Upload Profile Picture</h2>
                    <div className="radio-group">
                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit">Submit</button>

                    <div>
                        <p>Questions marked with * are required.</p>
                    </div>
                </form>
            </div>
        </VerifyLoggedIn>
    );
}

export default ProfileForm;
