import React, { useState } from 'react';

import '../Styles/Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPW] = useState('');
    const [userClicked, setUNClicked] = useState(false);
    const [pwClicked, setPWClicked] = useState(false);
    const [userError, setUNError] = useState();
    const [pwError, setPWError] = useState();

    const inputted = (e, text) => {
        if(text === 'username' && username.trim() !== ''){
            setUsername(e.target.value);
            setUNError('');
        }
        if(text === 'password' && password.trim() !== ''){
            setPW(e.target.value);
            setPWError('');
        }
    };

    const handleBlur = (text) => {
        if(text === 'username' && username.trim() === ''){
            setUNClicked(true);
            setUNError('This field is required.');
        }
        if(text === 'password' && password.trim() === ''){
            setPWClicked(true);
            setPWError('This field is required.');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if(username.trim() === ''){
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
                            <input type="text" placeholder='Username or Email*' onChange={inputted} onBlur={() => handleBlur('username')} required/>
                            {userClicked && userError && <p className='error'>{userError}</p>}
                        </div>
                        <div className = 'input'>
                            <input type="password" placeholder='Password*' onChange={inputted} onBlur={() => handleBlur('password')} required/>
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