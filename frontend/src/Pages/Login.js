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
    
        // changed ordering logic so you validate email and password before making the API call
        if (email.trim() === '') {
            setUNError('This field is required.');
            return;
        }
        if (password.trim() === '') {
            setPWError('This field is required.');
            return;
        }
    
        try {
            // Make the API call
            const response = await fetch('http://localhost:4000/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            switch (response.status) {
                case 200:
                    // Login successful
                    login();
                    navigate('/view-profile');
                    console.log('Signed in successfully!');
                    break;
                case 401:
                    // Unauthorized (wrong email or password)
                    console.error('Invalid email or password. Please try again.');
                    setUNError('Invalid email or password. Please try again.');
                    setPWError('Invalid email or password. Please try again.');
                    break;
                default:
                    // Any other unexpected status
                    console.error('Unexpected error:', response.statusText);
                    setUNError('An error occurred. Please try again.');
                    setPWError('An error occurred. Please try again.');
                    break;
            }
        } catch (error) {
            // Network or server error
            console.error('Fetch error:', error.message);
            setUNError('Network error. Please try again later.');
            setPWError('Network error. Please try again later.');
        }
    };
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