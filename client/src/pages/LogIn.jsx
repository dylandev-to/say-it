/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "../styles/auth.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import MessagePrompt from "../components/MessagePrompt";
import axios from "axios";

function LogIn() {
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

  // State to manage user login data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle input changes and update user login data state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Function to submit user login data
  const submitLogIn = async () => {
    try {
      // Send a POST request to the server for user authentication
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}${"/auth/signin"}`,
        userData,
        { withCredentials: true }
      );

      // Log the response data and navigate to the home page
      console.log(response.data);
      navigate("/");
    } catch (error) {
      // Display an error message and log details if login fails
      console.error("Error logging in:", error.response.data);
      displayMessage("Email/Password is not valid", 3000);
    }
  };

  // React Router hook to access and parse query parameters from the URL
  const [searchParams] = useSearchParams();

  // useEffect to display a message when a new account is created and redirected
  useEffect(() => {
    if (searchParams.get("new") === "true") {
      displayMessage("Account was created, please log in.", 3000);
    }
  }, []);

  return (
    <div className="signup">
      <MessagePrompt errorMessage={errorMessage} display={display} />
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
          <button className="loginButton" onClick={() => submitLogIn()}>
            Log In Account
          </button>
          <a onClick={() => navigate("/signup")}>
            You don't have an account? <u>Sign up</u>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
