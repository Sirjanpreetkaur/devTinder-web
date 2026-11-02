import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(",,,res", res);

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response?.data || "Something went wrong.");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      return navigate("/profile");

    }
    catch (err) {
      setError(err.response?.data || "Something went wrong.");
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-sm">

        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>

            {
              !isLoginForm && (
                <>
                  <fieldset className="fieldset">
                    <label className="label" htmlFor="emailId">First Name: </label>
                    <input type="text" value={firstName} id="name" className="input"
                      onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
                  </fieldset>

                  <fieldset className="fieldset">
                    <label className="label" htmlFor="emailId">Last Name: </label>
                    <input type="text" value={lastName} id="name" className="input"
                      onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />
                  </fieldset>
                </>
              )
            }

            <fieldset className="fieldset">
              <label className="label" htmlFor="emailId">Email Id: </label>
              <input type="text" value={emailId} id="name" className="input"
                onChange={(e) => setEmailId(e.target.value)} placeholder="Enter email" />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="password">Password: </label>
              <input type="password" value={password} id="name" className="input"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password" />
            </fieldset>

          </div>
          {error && <p className="text-red-500">Error: {error}</p>}
          <div className="card-actions justify-center my-6">
            <button className="btn btn-primary" onClick={() => { isLoginForm ? handleLogin() : handleSignUp() }}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p className='m-auto cursor-pointer'
            onClick={() => setIsLoginForm(value => !value)}>{isLoginForm ? "New User ? Signup here" : "Existing User ? Login Here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login
