import React, {useEffect, useState} from 'react';
import '../Styles/Profile.css'

function ViewProfile() {
    const[username, setUN] = useState('');
    
    useEffect(() => {
        fetch('/api/user/:id')
        .then(data => {
            setUN(data.name);
            console.log(data.name);
        })
    })
    return (
        <>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gridGap: 20, padding: 20}}>
            <div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/9-94702_user-outline-icon-clipart-png-download-profile-icon.png" style={{width: '5vw', minWidth: '100px'}} alt="pfp" />
                <h1>Name</h1>
                <h2>@username</h2>
                <p>Insert bio here.</p>
            </div>
            <div>
                <h1>Preferences</h1>
            </div>
        </div>
        </>
    )
}

export default ViewProfile;