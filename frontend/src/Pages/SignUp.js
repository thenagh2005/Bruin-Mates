import React, { useState } from 'react';

import '../Styles/Login.css'
//import { userSignUp } from '../../backend/controllers/user-controllers';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPW] = useState('');
    const [email, setEmail] = useState('');
    const [userClicked, setUNClicked] = useState(false);
    const [pwClicked, setPWClicked] = useState(false);
    const [emailClicked, setEmailClicked] = useState(false);
    const [userError, setUNError] = useState();
    const [pwError, setPWError] = useState();
    const [emailError, setEmailError] = useState();

    const inputted = (e, text) => {
        if (text === 'username' && username.trim() !== '') {
            setUsername(e.target.value);
            setUNError('');
        }
        if (text === 'password' && password.trim() !== '') {
            setPW(e.target.value);
            setPWError('');
        }
        if (text === 'email' && email.trim() !== '') {
            setEmail(e.target.value);
            setEmailError('');
        }
    };

    const handleBlur = (text) => {
        if (text === 'username' && username.trim() === '') {
            setUNClicked(true);
            setUNError('This field is required.');
        }
        if (text === 'password' && password.trim() === '') {
            setPWClicked(true);
            setPWError('This field is required.');
        }
        if (text === 'email' && email.trim() === '') {
            setEmailClicked(true);
            setEmailError('This field is required.');
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/api/v1/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  username, email, password }),
        });
    
        if (response.ok) {
            const data = await response.json();
            console.log('Signup successful', data);
        } else {
            console.log("Something went wrong");
            console.log(response.json());
        }

        console.log(username);
        
    }

    return (
        <>
            <form onSubmit={submit}>
                <div className='container'>
                    <div className='header'>
                        <div className='text'>Create Account</div>
                        <div className='underline'></div>

                    </div>
                    <div className='inputs'>
                        

                        <div className='input'>

                            <input type="username" placeholder='Username*' onChange={(e) => setUsername(e.target.value)} onBlur={() => handleBlur('username')} required />
                            {userClicked && userError && <p className='error'>{userError}</p>}

                        </div>
                        <div className='input'>
                            <input type="password" placeholder='Password*' onChange={(e) => setPW(e.target.value)} onBlur={() => handleBlur('password')} required />
                            {pwClicked && pwError && <p className='error'>{pwError}</p>}
                        </div>
                        <div className='input'>
                            <input type="email" placeholder='Email*' onChange={(e) => setEmail(e.target.value)} onBlur={() => handleBlur('email')} required />
                            {emailClicked && emailError && <p className='error'>{emailError}</p>}
                        </div>
                    </div>
                    <div className='submit-container'>
                        <button type="submit" className="submit">Sign Up</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUp;