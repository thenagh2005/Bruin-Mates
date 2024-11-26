import React, { useEffect, useState } from 'react';

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
    const [query, setQuery] = useState('');
    const [allusers, setAllUsers] = useState([]);
    const [smokes, setSmokes] = useState(false);
    const [alcohol, setAlcohol] = useState(false);
    const [building, setBuilding] = useState('');

    const [results, setResults] = useState([]);

    const [visiblecount, setVisibleCount] = useState(5);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/");

                const filtered = response.data.users.filter((item) => item.name !== localStorage.getItem('username'));

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
                (user.name.toLowerCase().includes(query.toLowerCase())
                )
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
                    <div className="filter">
                        <label htmlFor="smokes">Smoking Preference:</label>
                        <select
                            id="smokes"
                            value = {smokes}
                            onChange={(e) => setSmokes(e.target.value)}
                            >
                            <option value="">Any</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div className="filter">
                        <label htmlFor="alcohol">Alcohol Preference:</label>
                        <select
                            id="alcohol"
                            value = {alcohol}
                            onChange={(e) => setAlcohol(e.target.value)}
                            >
                            <option value="">Any</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <div className="filter">
                        <label htmlFor="building">Building:</label>
                        <select
                            id="building"
                            >
                            <option value="">Any</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                {/* Results Section */}
                <div className="results">

                    {


                        results.length === 0 ? (
                            <p>No users found</p>
                        ) : (results.slice(0, visiblecount).map((user) => (

                            <div className="user-card">
                                <div className="user-info">
                                    <h2>{user.name}</h2>
                                    <p><strong>Email:</strong> {user.email}</p>

                                    <div className='tooltip'>
                                        <button>View {user.name}'s page</button>
                                    </div>


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