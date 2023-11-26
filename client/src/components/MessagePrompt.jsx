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
      {/* Display the provided error message or a default "Undefined Message" if not provided */}
      <p>{props.errorMessage ?? "Undefined Message"}</p>
    </div>
  );
}

export default MessagePrompt;
