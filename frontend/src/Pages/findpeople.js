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
    const [results, setResults] = useState([]);

    const [visiblecount, setVisibleCount] = useState(5);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/user/");
                setAllUsers(response.data.users); // Set the full user list
                setResults(response.data.users); // Initially display all users
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
        // Filter users by name
        setResults((results) =>
            allusers.filter((user) =>
                user.name.toLowerCase().includes(query.toLowerCase())
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

            {/* Results Section */}
            <div className="results">

                {results.slice(0, visiblecount).map((user) => (

                    <div className="user-card">
                        <div className="user-info">
                            <h2>{user.name}</h2>
                            <p><strong>Email:</strong> {user.email}</p>

                            <p className='tooltip'>More information hahahahahaha</p>

                        </div>
                    </div>
                ))}
                {visiblecount < results.length && (
                    <button onClick={handleSeeMore}>See more</button>
                )}

            </div>
        </div>
        </>
    );
}

export default FindPeople;