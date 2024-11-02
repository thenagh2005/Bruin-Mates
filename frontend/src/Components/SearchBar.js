import React, { useState } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar" style={{ display: 'flex', justifyContent: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        style={{ width: '100px' }} // Adjust the width as needed
      />
    </div>
  );
}

export default SearchBar;