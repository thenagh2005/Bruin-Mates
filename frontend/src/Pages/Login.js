import React, { useState } from 'react';

import '../Styles/Login.css';

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setUsername] = useState('');
    const [password, setPW] = useState('');
    const [userClicked, setUNClicked] = useState(false);
    const [pwClicked, setPWClicked] = useState(false);
    const [userError, setUNError] = useState();
    const [pwError, setPWError] = useState();

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleBlur = (text) => {
        if(text === 'email' && email.trim() === ''){
            setUNClicked(true);
            setUNError('This field is required.');
        }
        if(text === 'password' && password.trim() === ''){
            setPWClicked(true);
            setPWError('This field is required.');
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:4000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            navigate("/view-profile");
        }

        if(email.trim() === ''){
            setUNError('This field is required.');
        }
        else if(password.trim() === ''){
            setUNError('This field is required.');
        }
        else{
            console.log("Signed up successfully!");
        }
    }

    return (
        <>
            <form onSubmit={submit}>
                <div className='container'>
                    <div className='header'>
                        <div className='text'>Login</div>
                        <div className='underline'></div>
                        
                    </div>
                    <div className='inputs'>
                        <div className = 'input'>
                            <input type="text" placeholder='Email*' onChange={(e) => setUsername(e.target.value)} onBlur={() => handleBlur('username')} required/>
                            {userClicked && userError && <p className='error'>{userError}</p>}
                        </div>
                        <div className = 'input'>
                            <input type="password" placeholder='Password*' onChange={(e) => setPW(e.target.value)} onBlur={() => handleBlur('password')} required/>
                            {pwClicked && pwError && <p className='error'>{pwError}</p>}
                        </div>
                    </div>
                    <div className='submit-container'>
                        <button type="login" className="submit">Login</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login;