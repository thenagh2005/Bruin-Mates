import React, { useState } from 'react';

import "../Styles/SearchPage.css";

const sampleData = [
    "Result 1: Lorem ipsum dolor sit amet",
    "Result 2: Consectetur adipiscing elit",
    "Result 3: Integer nec odio",
    "Result 4: Praesent libero",
    "Result 5: Sed cursus ante dapibus diam"
];

function FindPeople() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const filteredResults = sampleData.filter(item =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
    };

    return (
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
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <div key={index} className="result-item">
                            {result}
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
}

export default FindPeople;