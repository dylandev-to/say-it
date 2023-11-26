/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MessagePrompt from "../components/MessagePrompt";

function SignUp() {
  // State to manage user input data
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to control message display and store error messages
  const [display, setDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Function to display a message for a specified time
  const displayMessage = (message, time) => {
    setDisplay(true);
    setErrorMessage(message);

    // Set a timeout to hide the message after the specified time
    setTimeout(() => {
      setDisplay(false);
    }, time);
  };

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle input changes and update user data state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to submit user sign-up data
  const submitSignUp = async () => {
    try {
      // Send a POST request to the server to create a new user
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}${"/api/users"}`,
        userData
      );

      // Check if the user was created successfully (status code 201)
      if (response.status === 201) {
        console.log("User created:", response.data);

        // Navigate to the login page with a query parameter indicating a new user
        navigate("/login?new=true");
      }
    } catch (error) {
      // Display an error message and log details if user creation fails
      displayMessage("Email already exists", 3000);
      console.error("Error creating user:", error.response.data);
    }
  };

  return (
    <div className="signup">
      <MessagePrompt errorMessage={errorMessage} display={display} />
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
            value={userData.name}
            onChange={handleInputChange}
            name="name"
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
                  userData.password.length >= 6
                    ? "var(--third)"
                    : "var(--light)",
              }}
              className="bar"
            ></div>
            <div
              style={{
                backgroundColor:
                  userData.password.length > 9
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
