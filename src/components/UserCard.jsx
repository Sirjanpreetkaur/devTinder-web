import { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { useState } from 'react';

const UserCard = ({ user }) => {
    const {_id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL + "/request/send/"
                + status + "/" + userId, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId))
        }
        catch (err) {
            console.error(",,,err", err)

        }
    }
    console.log("user", user)
    return (
        <div className="card bg-base-300 w-90 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Profile Image" />
            </figure>
            <div className="card-body justify-center">
                <h2 className="card-title justify-center">{firstName} {lastName}</h2>
                {age && gender && <p className="card-title justify-center">{`${age} , ${gender}`}</p>}
                <p className="card-title justify-center">{about}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
