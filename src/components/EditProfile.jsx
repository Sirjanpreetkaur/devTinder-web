import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { useSelector } from 'react-redux';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "https://images.unsplash.com/photo-1682685794700-1f3e5c7b8d4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();


    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl
            }, {
                withCredentials: true
            })
            console.log(",,,res", res)
            dispatch(addUser(res.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        }
        catch (err) {
            setError(err.response?.data || "Something went wrong.");
        }
    }

    return (
        <div>
            <div className='flex justify-center my-10'>
                <div className='flex justify-center mx-10'>
                    <div className="card bg-base-300 w-96 shadow-sm">

                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>

                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="firstName">First Name: </label>
                                    <input type="text" value={firstName} id="firstName" className="input"
                                        onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" />
                                </fieldset>

                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="lastName">Last Name: </label>
                                    <input type="text" value={lastName} id="lastName" className="input"
                                        onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" />
                                </fieldset>

                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="photoUrl">Photo Url : </label>
                                    <input type="text" value={photoUrl} id="photoUrl" className="input"
                                        onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Enter photo URL" />
                                </fieldset>

                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="age">Age: </label>
                                    <input type="number" value={age} id="age" className="input"
                                        onChange={(e) => setAge(e.target.value)} placeholder="Enter age" />
                                </fieldset>

                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="gender">Gender: </label>
                                    <select value={gender} id="gender" className="input"
                                        onChange={(e) => setGender(e.target.value)}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </fieldset>

                                <fieldset className="fieldset">
                                    <label className="label" htmlFor="about">About: </label>
                                    <textarea value={about} id="about" className="textarea"
                                        onChange={(e) => setAbout(e.target.value)} placeholder="Tell us about yourself" />
                                </fieldset>

                            </div>
                            {error && <p className="text-red-500">Error: {error}</p>}
                            <div className="card-actions justify-center my-6">
                                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
           {showToast &&(
            <>
             <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>
            </>
           )}
        </div>
    )
}

export default EditProfile;
