import React, { useState } from 'react';

import '../Styles/Login.css';

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import NotLoggedIn from '../Components/NotLoggedIn.js';

function Login() {
    const [email, setUsername] = useState('');
    const [password, setPW] = useState('');
    const [userClicked, setUNClicked] = useState(false);
    const [pwClicked, setPWClicked] = useState(false);
    const [userError, setUNError] = useState();
    const [pwError, setPWError] = useState();
    const [loginError, setLoginError] = useState("");

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleBlur = (text) => {
        if(text === 'email' && email.trim() === ''){
            setUNClicked(true);
            setUNError('This field is required.');
        }
        else if(text === 'email'){
            setUNError('');
        }
        if(text === 'password' && password.trim() === ''){
            setPWClicked(true);
            setPWError('This field is required.');
        }
        else if(text === 'password'){
            setPWError('');
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        setLoginError("");
        
        const response = await fetch('http://localhost:4000/api/v1/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });
        console.log(JSON.stringify(response));

        if(email.trim() === ''){
            setUNError('This field is required.');
            return;
        }
        if (password.trim() === '') {
            setPWError('This field is required.');
            return;
        }

        if (response.status === 200) {
            setLoginError("");
            login();
            navigate("/view-profile");
        }
        else if(response.status === 422){
            setLoginError("Please enter a valid email.");
        }
        else if(response.status !== 200){
            setLoginError("Invalid email or password.");
        }
    };
    return (
        <>
        <NotLoggedIn>
            <div>{loginError && <div className="login-error signup-error"> <img className="login-error-image" 
            src="https://cdn.iconscout.com/icon/free/png-512/free-critical-icon-download-in-svg-png-gif-file-formats--alert-warning-error-user-interface-pack-icons-2598224.png?f=webp&w=256" 
            alt="Error sign!"></img><span>{loginError}</span>
                </div>}
                <form onSubmit={submit}>
                    <div className='container'>
                        <div className='header'>
                            <div className='text'>Login</div>
                            <div className='underline'></div>
                            
                        </div>
                        <div className='inputs'>
                            <div className = 'input'>
                                <input type="text" placeholder='Email*' onChange={(e) => setUsername(e.target.value)} onBlur={() => handleBlur('email')} required/>
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
            </div>
        </NotLoggedIn>
        </>
    )
}

export default Login;