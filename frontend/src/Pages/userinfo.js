import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import "../Styles/UserInfo.css";

function UserInfo() {
  const sleepyTimes = ['6 PM - 8 PM',
    '8 PM - 10 PM',
    '10 PM - 12 AM',
    '12 AM - 2 AM',
    "I'm Nocturnal HAHAHAHAHAHAHA" ];

  const { id } = useParams();
  const [user, setUsers] = useState([]);

  const [cleanliness, setCleanliness] = useState("");
  const [sleepTime, setSleepTime] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [genderInclusivity, setGenderInclusivity] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [building, setBuilding] = useState("");
  const [occupancy, setOccupancy] = useState("");

  const [age, setAge] = useState("");
  const [biography, setBiography] = useState("");
  const [gender, setGender] = useState("");
  const [pronouns, setPronouns] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/user/users/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUsers(data);

        setCleanliness(data.preferences.cleanliness);
        setSleepTime(sleepyTimes[parseInt(data.preferences.sleepTime, 10) - 1]);
        setSmoking(data.preferences.smoking);
        setAlcohol(data.preferences.alcohol);
        setGenderInclusivity(data.preferences.genderInclusivity);
        setRoomType(data.preferences.roomType);
        setBuilding(data.preferences.building);
        setOccupancy(data.preferences.occupancy);
        setAge(data.profileInfo.age);
        setBiography(data.profileInfo.biography);
        setGender(data.profileInfo.gender);
        setPronouns(data.profileInfo.pronouns);
      } catch (err) {

      } finally {

      }
    };

    fetchUser();
  }, [id]);

  return (
    <>
      <h1>User Info goes here</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gridGap: 20, padding: 20 }}>
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/9-94702_user-outline-icon-clipart-png-download-profile-icon.png" style={{ width: '5vw', minWidth: '100px' }} alt="pfp" />
                        <h1>Name</h1>
                        <h2>{user.name}</h2>
                        <h2>Age:</h2>
                        <p>{age}</p>
                        <h2>Biography:</h2>
                        <p>{biography}</p>
                        <h2>Gender:</h2>
                        <p>{gender}</p>
                        <h2>Preferred Pronouns:</h2>
                        <p>{pronouns}</p>


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

                        <h2>Gender Inclusivity:</h2>
                        <p>{genderInclusivity ? "Yes" : "No"} </p>

                        <h2>Room Type:</h2>
                        <p>{roomType}</p>

                        <h2>Building:</h2>
                        <p>{building}</p>

                        <h2>Occupancy:</h2>
                        <p>{occupancy}</p>
                        
                        
                    </div>
                </div>
    </>
  )
}

export default UserInfo;