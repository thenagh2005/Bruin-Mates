import React, { useEffect, useState } from 'react';

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import VerifyLoggedIn from '../Components/VerifyLoggedIn.js';

import '../Styles/Messages.css';

import axios from 'axios';

const Messages = () => {
    const [requests, setRequests] = useState([]);
    const [requestingUsers, setRequestingUsers] = useState([]);
    const [acceptedUsers, setAcceptedUsers] = useState([]);

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    // Redirects user if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    const getPendingRequests = async () => {
        try {
            await axios.get('http://localhost:4000/api/v1/matching/get-pending-matches', {
                withCredentials: true
            }).then((response) => {
                setRequests(response.data.receivedRequests);
            });
        } catch(error) {
            console.error("Error fetching requests:", error);
        }
    }

    const getAcceptedMatches = async () => {
        console.log('calling')
        try {
            await axios.get('http://localhost:4000/api/v1/matching/get-accepted-matches', {
                withCredentials: true
            }).then((response) => {
                console.log('here')
                console.log(response)
                setAcceptedUsers(response.data.matches);
            });
        } catch(error) {
            console.error("Error fetching accepted requests:", error);
        }
    }

    useEffect(() => {
        getPendingRequests();
        getAcceptedMatches();
    }, [isLoggedIn]);

    useEffect(() => {
        const getUsersData = async () => {
            // Fetch all user data in parallel
            const userPromises = requests.map((request) =>
                axios.get(`http://localhost:4000/api/v1/user/users/${request.requester_id}`, {
                    withCredentials: true,
                })
            );

            // Wait for all requests to resolve
            const userResponses = await Promise.all(userPromises);

            // Extract data and set state
            const users = userResponses.map((response) => response.data);
            setRequestingUsers(users);
        }
        getUsersData();

    }, [requests]);

    // useEffect(() => {
    //     const getAcceptedUsersData = async () => {
    //         const response = await axios.get('http://localhost:4000/api/v1/user/curr-user', {
    //             withCredentials: true
    //         });
    //         const currUser = response.data.user;
    //         console.log(currUser);
    //         console.log('---')
    //         console.log(acceptedMatches);
    //         const userPromises = acceptedMatches.map((request) => {
    //             const userId = request.requester_id == currUser._id ? request.recipient_id : request.requester_id;
    //             console.log('printing user id')
    //             console.log(userId)
    //             return axios.get(`http://localhost:4000/api/v1/user/users/${userId}`, {
    //                 withCredentials: true,
    //             })
    //         });

    //         const userResponses = await Promise.all(userPromises);
    //         console.log('1')
    //         console.log(userResponses);
    //         const users = userResponses.map((response) => response.data);
    //         setAcceptedMatches(users);
    //     }
    //     getAcceptedUsersData();
    // }, [acceptedMatches]);

    const rejectInvite = async (userId) => {
        try {
            console.log(userId);
            await axios.post(`http://localhost:4000/api/v1/matching/reject-match/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }).then((response) => {
                let users = requestingUsers.filter(user => user._id != userId);
                setRequestingUsers(users);            
            });
            alert('Rejected Invite')
        } catch(error) {
            console.error("Error rejecting requests:", error);
        }

    }

    const acceptInvite = async (userId) => {
        try {
            console.log(userId);
            const response = await axios.post(`http://localhost:4000/api/v1/matching/accept-match/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            let users = requestingUsers.filter(user => user._id != userId);
            setRequestingUsers(users);
            getAcceptedMatches();
            alert('Accepted Invite')
        } catch(error) {
            console.error("Error accepted requests:", error);
        }
    }

    return (
        <VerifyLoggedIn>
            <h1>Accepted Matches</h1>
            { acceptedUsers.length > 0 ? (
                <ol className='accepted-list'>
                    { acceptedUsers.map((user, index) => (
                        <div className='accepted-item'>
                            <p className='accepted-message'><a href={`/users/${user._id}`}>{user.name}</a> - <i>Email: {user.email}</i></p>
                        </div>
                    )) }
                </ol>
            ) : (
                <p>No accepted matches</p>
            )}

            <h1>Pending Matches</h1>
            { requestingUsers.length > 0 ? (
                <ol className='requests-list'>
                    { requestingUsers.map((user, index) => (
                        <div className='message-item'>
                            <p className='message-text'><a href={`/users/${user._id}`}>{user.name}</a> wants to join your group!</p>
                            <button onClick={() => acceptInvite(user._id)} >Accept</button>
                            <button onClick={() => rejectInvite(user._id)}>Reject</button>
                        </div>

                    ))}
                </ol>
            ) : (
                <p className='message-text'>No pending requests.</p>
            )}

        </VerifyLoggedIn>
    )
}

export default Messages;