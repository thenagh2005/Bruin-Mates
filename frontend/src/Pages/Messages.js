import React, { useEffect, useState } from 'react';

import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import VerifyLoggedIn from '../Components/VerifyLoggedIn.js';
import axios from 'axios';

const Messages = () => {
    const [requests, setRequests] = useState([]);
    const [requestingUsers, setRequestingUsers] = useState([]);

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
        console.log('fetched requests')
    }

    useEffect(() => {
        getPendingRequests();
    }, [isLoggedIn]);

    useEffect(() => {
        const getUsersData = async () => {
            let users = [];
            console.log(requests)
            requests.forEach(async (request) => {
                await axios.get('http://localhost:4000/api/v1/user/users/' + request.requester_id, {
                    withCredentials: true
                }).then((response) => {
                    console.log(response.data)
                    setRequestingUsers((prevUsers) => [...prevUsers, response.data]);
                })
            })
            // console.log(users)
            // setRequestingUsers(users);
        }
        getUsersData();

    }, [requests]);

    const rejectInvite = async (userId) => {
        try {
            console.log(userId);
            await axios.post(`http://localhost:4000/api/v1/matching/reject-match/${userId}`, {}, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }).then((response) => {
                getPendingRequests();
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
            getPendingRequests();
            alert('Accepted Invite')
        } catch(error) {
            console.error("Error accepted requests:", error);
        }
    }

    return (
        <VerifyLoggedIn>
            <h1>Messages</h1>
            { requestingUsers.length > 0 ? (
                <ol>
                    { requestingUsers.map((user, index) => (
                        <div>
                            <p><a href={`/users/${user._id}`}>{user.name}</a> wants to join your group!</p>
                            <button onClick={() => acceptInvite(user._id)} >Accept</button>
                            <button onClick={() => rejectInvite(user._id)}>Reject</button>
                        </div>

                    ))}
                </ol>
            ) : (
                <p>No pending requests.</p>
            )}
        </VerifyLoggedIn>
    )
}

export default Messages;