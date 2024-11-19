import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/ProfileForm.css';

function ProfileForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cleanliness: null,
        sleepTime: null,
        smoking: false,
        alcohol: false,
        roomType: '',
        building: '',
        occupancy: '',
        age: ''
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
        universityApartments: [
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
    };

    const handleRoomTypeChange = (e) => {
        const selectedRoomType = e.target.value;
        setFormData({ ...formData, roomType: selectedRoomType });
        setBuildingOptions(roomTypes[selectedRoomType] || []);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Form Data:', formData);

        try {
            const response = await axios.post('http://localhost:4000/api/v1/user/preferences', formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                navigate("/view-profile"); 
                console.log('Preferences saved successfully!');
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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Cleanliness */}
                <h2>How important is cleanliness to you?</h2>
                <div className="radio-group">
                    {[1, 2, 3, 4, 5].map((val) => (
                        <label key={val}>
                            <input
                                type="radio"
                                name="cleanliness"
                                value={val}
                                checked={formData.cleanliness === val.toString()}
                                onChange={handleChange}
                            />
                            {val}
                        </label>
                    ))}
                </div>

                {/* Sleep Time */}
                <h2>What time do you prefer to sleep?</h2>
                <div className="radio-group">
                    {['1', '2', '3', '4', '5'].map((val, idx) => (
                        <label key={idx}>
                            <input
                                type="radio"
                                name="sleepTime"
                                value={val}
                                checked={formData.sleepTime === val}
                                onChange={handleChange}
                            />
                            {val === '1'
                                ? '6 PM - 8 PM'
                                : val === '2'
                                ? '8 PM - 10 PM'
                                : val === '3'
                                ? '10 PM - 12 AM'
                                : val === '4'
                                ? '12 AM - 2 AM'
                                : "I'm Nocturnal HAHAHAHAHAHAHA"}
                        </label>
                    ))}
                </div>

                {/* Smoking */}
                <h2>Are you okay with smoking (any kind)?</h2>
                <div className="inline-group">
                    <label>
                        <input
                            type="radio"
                            name="smoking"
                            value="1"
                            checked={formData.smoking === true}
                            onChange={(e) =>
                                setFormData({ ...formData, smoking: e.target.value === '1' })
                            }
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="smoking"
                            value="2"
                            checked={formData.smoking === false}
                            onChange={(e) =>
                                setFormData({ ...formData, smoking: e.target.value === '1' })
                            }
                        />
                        No
                    </label>
                </div>

                {/* Alcohol */}
                <h2>Are you okay with alcohol consumption?</h2>
                <div className="inline-group">
                    <label>
                        <input
                            type="radio"
                            name="alcohol"
                            value="1"
                            checked={formData.alcohol === true}
                            onChange={(e) =>
                                setFormData({ ...formData, alcohol: e.target.value === '1' })
                            }
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="alcohol"
                            value="2"
                            checked={formData.alcohol === false}
                            onChange={(e) =>
                                setFormData({ ...formData, alcohol: e.target.value === '1' })
                            }
                        />
                        No
                    </label>
                </div>


                {/* Age */}
                <h2>What is your age?</h2>
                <div className="radio-group">
                    <select
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    >
                        <option value="">-- Select Your Age --</option>
                        <option value="under 18">Under 18</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23+">23+</option>
                    </select>
                </div>

                {/* Room Type */}
                <h2>Please select your room type</h2>
                <div className="radio-group">
                    {Object.keys(roomTypes).map((type) => (
                        <label key={type}>
                            <input
                                type="radio"
                                name="roomType"
                                value={type}
                                checked={formData.roomType === type}
                                onChange={handleRoomTypeChange}
                            />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </label>
                    ))}
                </div>

                {formData.roomType && (
                    <>
                        {/* Building */}
                        <h2>Please select your building</h2>
                        <select className="radio-group"
                            name="building"
                            value={formData.building}
                            onChange={handleChange}
                        >
                            <option value="">-- Select a Building --</option>
                            {buildingOptions.map((building) => (
                                <option key={building} value={building}>
                                    {building}
                                </option>
                            ))}
                        </select>

                        {/* Occupancy */}
                        <h2>Occupancy</h2>
                        <div className="radio-group">
                            {(formData.roomType === 'universityApartments'
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
                                        checked={formData.occupancy === value}
                                        onChange={handleChange}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {/* Submit */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProfileForm;
