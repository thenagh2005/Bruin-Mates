import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import "../Styles/UserInfo.css";
import axios from "axios";

function UserInfo() {
  const sleepyTimes = ['6 PM - 8 PM',
    '8 PM - 10 PM',
    '10 PM - 12 AM',
    '12 AM - 2 AM',
    "I'm Nocturnal HAHAHAHAHAHAHA"];

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
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

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

  const sendConnectionRequest = async () => {
      try {
        const match_response = await axios.post(`http://localhost:4000/api/v1/matching/process-match/${id}`, {
          withCredentials: true
        });
        alert('Connection request sent!');
      } catch (err) { 

      }
  }

  return (
    <>
      <div className='super-container'>

        <div className='info-container'>
          <div className='profile-info'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/9-94702_user-outline-icon-clipart-png-download-profile-icon.png" style={{ width: '5vw', minWidth: '100px' }} alt="pfp" />
            <h1>Name</h1>
            <h2>{user.name}</h2>
            <h2>Age: {age}</h2>
            <p></p>
            <h2>Biography:</h2>
            <p>{biography}</p>
            <h2>Gender: {gender}</h2>
            <p></p>
            <h2>Preferred Pronouns: {pronouns}</h2>
            <p></p>

            <button onClick={sendConnectionRequest}>Connect</button>


          </div>
          <div className='prefs'>
            <h1>Preferences</h1>

            <h2>Cleanliness: {cleanliness}</h2>
            <p></p>

            <h2>Preferred Sleeping Time: {sleepTime}</h2>
            <p></p>

            <h2>Smoking: {smoking ? "Yes" : "No"}</h2>
            <p></p>

            <h2>Alcohol: {alcohol ? "Yes" : "No"}</h2>
            <p></p>

            <h2>Gender Inclusivity: {genderInclusivity ? "Yes" : "No"}</h2>
            <p> </p>

            <h2>Room Type: {roomType}</h2>
            <p></p>

            <h2>Building: {building}</h2>
            <p></p>

            <h2>Occupancy: {occupancy}</h2>
            <p></p>


          </div>
          
        </div>
        

      </div>
      

    </>
  )
}

export default UserInfo;