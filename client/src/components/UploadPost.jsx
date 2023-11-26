import React, { useState } from "react";
import "../styles/uploadpost.css";
import axios from "axios";

const maxLengthMessage = 200;

function UploadPost(props) {
  const [message, setMessage] = useState("");

  const submitPost = async () => {
    try {
      const data = {
        content: message
      };

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

      if (response.status === 201) {
        // window.location.reload();
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
