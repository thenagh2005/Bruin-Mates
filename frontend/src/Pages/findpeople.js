import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import "../Styles/SearchPage.css";

import axios from "axios";

const sampleData = [
    "Result 1: Lorem ipsum dolor sit amet",
    "Result 2: Consectetur adipiscing elit",
    "Result 3: Integer nec odio",
    "Result 4: Praesent libero",
    "Result 5: Sed cursus ante dapibus diam"
];

function FindPeople() {
    

    const buildings = ['Sproul', 'Rieber', 'Hedrick', 'Dykstra',
        'Holly', 'Gardenia', 'Cove', 'Landing', 'Olympic', 'Centennial',

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
        ,
        'Saxon', 'Hitch',

        'Gayley Court',
        'Gayley Towers',
        'Glenrock',
        'Glenrock West',
        'Landfair',
        'Landfair Vista',
        'Levering Terrace',
        'Westwood Chateau',
        'Westwood Palm'
    ]

    const [showAdvanced, setShowAdvanced] = useState(false);

    const toggleAdvancedSearch = () => {
        setShowAdvanced(!showAdvanced);
        setSmokes('');
        setAlcohol('');
        setBuilding('');
        setCleanliness('');
        setGender('');
    };

    const [query, setQuery] = useState('');
    const [allusers, setAllUsers] = useState([]);
    const [smokes, setSmokes] = useState('');
    const [alcohol, setAlcohol] = useState('');
    const [building, setBuilding] = useState('');
    const [roomType, setRoomType] = useState('');
    const [cleanliness, setCleanliness] = useState('');
    const [sleepTime, setSleepTime] = useState('');

    const [gender, setGender] = useState('');

    const [results, setResults] = useState([]);

    const [visiblecount, setVisibleCount] = useState(5);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/");

                const filtered = response.data.users.filter((item) => item.name !== localStorage.getItem('username') && "preferences" in item && "profileInfo" in item);

                //setAllUsers(response.data.users); // Set the full user list
                //setResults(response.data.users); // Initially display all users

                setAllUsers(filtered);
                setResults(filtered);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleSeeMore = () => {
        setVisibleCount((prev) => prev + 5);
    };



    const handleSearch = () => {
        console.log(smokes);
        // Filter users by name
        setResults((results) =>

            allusers.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase())
                && `${user.preferences.alcohol}`.includes(alcohol)
                && `${user.preferences.smoking}`.includes(smokes)
                && `${user.preferences.building}`.includes(building)
                && `${user.profileInfo.gender}`.includes(gender)
                && `${user.preferences.cleanliness}`.includes(cleanliness)
                && `${user.preferences.sleepTime}`.includes(sleepTime)
                && `${user.preferences.roomType}`.includes(roomType)

            )
        );
    };

    return (
        <>
            <h1 className="header">Search for a user</h1>
            <div className="container">
                {/* Search Bar Section */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                <div className="filter-options">
                    <div className='toggle-container'>
                        <span className="toggle" onClick={toggleAdvancedSearch}>
                            {
                                showAdvanced ?
                                ("Hide") : ("Show Advanced")
                            }
                        </span>
                    </div>

                    {showAdvanced && (
                        <>
                        <div className="filter">
                        <label htmlFor="smokes">Smoking Preference:</label>
                        <select
                            id="smokes"
                            value={smokes}
                            onChange={(e) => setSmokes(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div className="filter">
                        <label htmlFor="alcohol">Alcohol Preference:</label>
                        <select
                            id="alcohol"
                            value={alcohol}
                            onChange={(e) => setAlcohol(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div className="filter">
                        <label htmlFor="building">Building:</label>
                        <select
                            id="building"
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                        >
                            <option value=""></option>
                            {buildings.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter">
                        <label htmlFor="roomtype">Room Type:</label>
                        <select
                            id="roomtype"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="classic">Classic</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="plaza">Plaza</option>
                            <option value="suite">Suite</option>
                        </select>
                    </div>
                    <div className="filter">
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                        </select>
                    </div>
                    <div className="filter">
                        <label htmlFor="cleanliness">Cleanliness:</label>
                        <select
                            id="cleanliness"
                            value={cleanliness}
                            onChange={(e) => setCleanliness(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="filter">
                        <label htmlFor="sleeptime">Sleeping Time:</label>
                        <select
                            id="sleeptime"
                            value={sleepTime}
                            onChange={(e) => setSleepTime(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="1">6 PM - 8 PM</option>
                            <option value="2">8 PM - 10 PM</option>
                            <option value="3">10 PM - 12 AM</option>
                            <option value="4">12 AM - 2 AM</option>
                            <option value="5">Other</option>
                        </select>
                    </div>
                    </>
                    )}
                </div>

                {/* Results Section */}
                <div className="results">

                    {


                        results.length === 0 ? (
                            <p>No users found</p>
                        ) : (results.slice(0, visiblecount).map((user) => (

                            <div key={user._id} className="user-card">
                                <div className="user-info">
                                    <h2>{user.name}</h2>
                                    <p><strong>Email:</strong> {user.email}</p>

                                    <Link to={`/users/${user._id}`}> See {user.name}'s profile </Link>




                                </div>
                            </div>
                        )))}
                    {visiblecount < results.length && (
                        <button onClick={handleSeeMore}>See more</button>
                    )}

                </div>
            </div>
        </>
    );
}

export default FindPeople;