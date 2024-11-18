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
    const [signUpSuccess, setSignUpSuccess] = useState();
    const [signUpError, setSignUpError] = useState();

    const handleBlur = (text) => {
        if (text === 'username' && username.trim() === '') {
            setUNClicked(true);
            setUNError('This field is required.');
        }
        else if (text === 'username'){
            setUNError('');
        }
        if (text === 'password' && password.trim() === '') {
            setPWClicked(true);
            setPWError('This field is required.');
        }
        else if (text === 'password'){
            setPWError('');
        }
        if (text === 'email' && email.trim() === '') {
            setEmailClicked(true);
            setEmailError('This field is required.');
        }
        else if (text === 'email'){
            setEmailError('');
        }
    };

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:4000/api/v1/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name:username, email, password }),
        });
    
        if (response.ok) {
            setSignUpSuccess(
                <>
                    Signed up successfully! Return to{' '}
                    <a href="/login" style={{textDecoration: 'underline'}}>
                        login
                    </a>
                    .
                </>
            );
        } else if (response.status === 401) {
            setSignUpError("This username is taken.");
        }
        else if (response.status === 409){
            setSignUpError("This email is already in use.");
        }        
    }

    return (
        <div>{signUpSuccess && <div className="signup-success"> <img src="https://cdn.iconscout.com/icon/free/png-256/free-check-circle-icon-download-in-svg-png-gif-file-formats--done-approve-accept-user-interface-pack-icons-2598237.png" alt="Success check!"></img><span>{signUpSuccess}</span>
            </div>}
            {signUpError && <div className="signup-error"> <img src="https://cdn.iconscout.com/icon/free/png-512/free-critical-icon-download-in-svg-png-gif-file-formats--alert-warning-error-user-interface-pack-icons-2598224.png?f=webp&w=256" alt="Signup error!"></img><span>{signUpError}</span>
            </div>}
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
        </div>
    )
}

export default SignUp;