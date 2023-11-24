/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
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
          <h2>Welcome to SayIt!</h2>
          <p>
            Express your thoughts openly on SayIt, where freedom of expression
            is celebrated.
          </p>
          <img src="/resources/padlock.png" width={300} height={300} alt="" />
        </div>
        <div className="right">
          <h1>Sign Up</h1>
          <input
            type="text"
            value={userData.username}
            onChange={handleInputChange}
            name="username"
            placeholder="Username"
            id=""
          />
          <br />
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
          <div className="passwordStrenght">
            <p>Password strength</p>
            <div
              style={{
                backgroundColor:
                  userData.password.length > 3
                    ? "var(--third)"
                    : "var(--light)",
              }}
              className="bar"
            ></div>
            <div
              style={{
                backgroundColor:
                  userData.password.length > 6
                    ? "var(--third)"
                    : "var(--light)",
              }}
              className="bar"
            ></div>
            <div
              style={{
                backgroundColor:
                  userData.password.length > 12
                    ? "var(--third)"
                    : "var(--light)",
              }}
              className="bar"
            ></div>
          </div>
          <button onClick={() => submitSignUp()}>Create Account</button>
          <a onClick={() => navigate("/login")}>
            Already have an account? <u>Log in</u>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
