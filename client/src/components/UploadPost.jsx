import React, { useState } from "react";
import "../styles/uploadpost.css";
import axios from "axios";

// Define the maximum length for the post message
const maxLengthMessage = 200;

// UploadPost component
function UploadPost(props) {
  // State to manage the post message
  const [message, setMessage] = useState("");

  // Function to submit the post
  const submitPost = async () => {
    try {
      // Prepare data for the post request
      const data = {
        content: message
      };

      // Send a post request to the server to create a new post
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}${"/api/posts"}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      // If the post is successfully created (status code 201), reload the page
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user:", error.response.data);
    }
  };

  return (
    <div className="uploadPost">
      <div className="input">
        <img
          src={props.profileInfo?.profilePicture ?? "/resources/profile.svg"}
          width={100}
          height={100}
          alt=""
        />
        <textarea
          style={{
            height: message.length > 0 ? "100px" : "20px",
          }}
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= maxLengthMessage) {
              setMessage(e.target.value);
            }
          }}
          placeholder="Say it..."
          name=""
          id=""
          cols="30"
          rows="100"
        ></textarea>
      </div>
      <div
        style={{
          display: message.length > 0 ? "flex" : "none",
        }}
        className="submit"
      >
        <p>
          {message.length}/{maxLengthMessage}
        </p>
        <button onClick={() => submitPost()}>Say it!</button>
      </div>
    </div>
  );
}

export default UploadPost;
