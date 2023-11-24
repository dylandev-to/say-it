/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const submitSignUp = () => {};

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="signup">
      <div className="form">
        <div className="left">
          <h2>Welcome again to SayIt!</h2>
          <p>
            Express your thoughts openly on SayIt, where freedom of expression
            is celebrated.
          </p>
          <img src="/resources/padlock.png" width={300} height={300} alt="" />
        </div>
        <div className="right">
          <h1>Log In</h1>
          <input
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            name="email"
            placeholder="Email"
            id=""
          />
          <br />
          <input
            type="password"
            value={userData.password}
            onChange={handleInputChange}
            name="password"
            placeholder="Password"
            id=""
          />
          <button className="loginButton" onClick={() => submitSignUp()}>Log In Account</button>
          <a onClick={() => navigate("/signup")}>
            You don't have an account? <u>Sign up</u>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
