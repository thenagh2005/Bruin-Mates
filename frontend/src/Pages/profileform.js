import React, { useState } from 'react';

import NavBar from '../NavBar';

import '../Styles/ProfileForm.css'

function ProfileForm() {
    return (
        <>
            <NavBar />

            <div class="form-container">
                <form action="/submit" method="post">
                    <h2>How important is cleanliness to you?</h2>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="clean" value="1" required />
                            1
                        </label>
                        <label>
                            <input type="radio" name="clean" value="2" />
                            2
                        </label>
                        <label>
                            <input type="radio" name="clean" value="3" />
                            3
                        </label>
                        <label>
                            <input type="radio" name="clean" value="4" />
                            4
                        </label>
                        <label>
                            <input type="radio" name="clean" value="5" />
                            5
                        </label>
                    </div>

                    <h2>What time do you prefer to sleep?</h2>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="sleep" value="1" required />
                            6 PM - 8 PM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="2" />
                            8 PM - 10 PM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="3" />
                            10 PM - 12 AM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="4" />
                            12 AM - 2 AM
                        </label>
                        <label>
                            <input type="radio" name="sleep" value="5" />
                            I'm Nocturnal HAHAHAHAHAHAHA
                        </label>
                    </div>

                    <h2>Are you okay with smoking (any kind)?</h2>

                    <div class="radio-group">
                        <label>
                            <input type="radio" name="choice" value="1" required />
                            Yes
                        </label>
                        <label>
                            <input type="radio" name="choice" value="2" />
                            No
                        </label>

                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>

        </>
    );
}

export default ProfileForm;