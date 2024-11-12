import React, { useState } from 'react';

import '../Styles/ProfileForm.css'

function ProfileForm() {
    const [roomType, setRoomType] = useState('');
    const [buildingOptions, setBuildingOptions] = useState([]);

    const roomTypes = {
        classic: ['Sproul', 'Rieber', 'Hedrick', 'Dykstra'],
        deluxe: ['Holly', 'Gardenia', 'Cove', 'Landing', 'Olympic', 'Centennial'],
        plaza: ['Sunset Village', 'Rieber Terrace', 'Rieber Vista', 'Hedrick Summit', 
                'De Neve Plaza - Acacia', 'De Neve Plaza - Birch', 'De Neve Plaza - Cedar', 
                'De Neve Plaza - Dogwood', 'De Neve Plaza - Evergreen', 'De Neve Plaza - Fir',
                'De Neve Plaza - Gardenia', 'De Neve Plaza - Holly'],
        suite: ['Saxon', 'Hitch'],
        universityApartments: ['Gayley Court', 'Gayley Towers', 'Glenrock', 'Glenrock West',
                                'Landfair', 'Landfair Vista', 'Levering Terrace', 
                                'Westwood Chateau', 'Westwood Palm']
    };

    const handleRoomTypeChange = (e) => {
        const selectedRoomType = e.target.value;
        setRoomType(selectedRoomType);
        setBuildingOptions(roomTypes[selectedRoomType] || []);
    };



    return (
        <>
            <div class="form-container">
                <form action="/submit" method="post">


                    <h2>How important is cleanliness to you?</h2>


                    <div class="radio-group">
                        <label>
                            <input type="radio" name="clean" value="1" required />
                            1
                        </label>
                        <label>
                            <input type="radio" name="clean" value="2" />
                            2
                        </label>
                        <label>
                            <input type="radio" name="clean" value="3" />
                            3
                        </label>
                        <label>
                            <input type="radio" name="clean" value="4" />
                            4
                        </label>
                        <label>
                            <input type="radio" name="clean" value="5" />
                            5
                        </label>
                    </div>

                    <h2>What time do you prefer to sleep?</h2>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="sleep" value="1" required />
                            6 PM - 8 PM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="2" />
                            8 PM - 10 PM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="3" />
                            10 PM - 12 AM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="4" />
                            12 AM - 2 AM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="5" />
                            I'm Nocturnal HAHAHAHAHAHAHA
                        </label>
                    </div>

                    <h2>Are you okay with smoking (any kind)?</h2>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="choice" value="1" required />
                            Yes
                        </label>
                        <label>
                            <input type="radio" name="choice" value="2" />
                            No
                        </label>

                    </div>

                    <h2>Are you okay with alcohol?</h2>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="choice" value="1" required />
                            Yes
                        </label>
                        <label>
                            <input type="radio" name="choice" value="2" />
                            No
                        </label>

                    </div>
                <h2>Please select your room type</h2>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="roomType"
                            value="classic"
                            onChange={handleRoomTypeChange}
                        />
                        Classic
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="roomType"
                            value="deluxe"
                            onChange={handleRoomTypeChange}
                        />
                        Deluxe
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="roomType"
                            value="plaza"
                            onChange={handleRoomTypeChange}
                        />
                        Plaza
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="roomType"
                            value="suite"
                            onChange={handleRoomTypeChange}
                        />
                        Suite
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="roomType"
                            value="universityApartments"
                            onChange={handleRoomTypeChange}
                        />
                        University Apartments
                    </label>
                </div>

                {roomType && (
                    <>
                        <h2>Please select your building</h2>
                        <div className="radio-group">
                            <select name="building">
                                {buildingOptions.map((building, index) => (
                                    <option key={index} value={building.toLowerCase()}>
                                        {building}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <h2>Occupancy</h2>
                        <div class="radio-group">
                            <label>
                                <input type="radio" name="sleep" value="1" required />
                                Double
                            </label>
                            <label>
                                <input type="radio" name="sleep" value="2" />
                                Triple
                            </label>
                        </div>
                    </>
                )}


                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default ProfileForm;