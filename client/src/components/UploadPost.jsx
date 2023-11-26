import React, { useState } from "react";
import "../styles/uploadpost.css";

const maxLengthMessage = 200;

function UploadPost(props) {
  const [message, setMessage] = useState("");

  return (
    <div className="uploadPost">
      <div className="input">
      <img src={props.profileInfo?.profilePicture ?? "/resources/profile.svg"} width={100} height={100} alt="" />
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
        <button>Say it!</button>
      </div>
    </div>
  );
}

export default UploadPost;
