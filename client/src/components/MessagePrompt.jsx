import React from "react";
import "../styles/messageprompt.css";

function MessagePrompt(props) {
  return (
    <div
      style={{
        transform: props.display ? "translateY(-40vh)" : "translateY(-100vh)",
      }}
      className="messagePrompt"
    >
      <p>{props.errorMessage ?? "Undefined Message"}</p>
    </div>
  );
}

export default MessagePrompt;
