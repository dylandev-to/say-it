import React from "react";
import "../styles/thanksdownload.css";
import handleDownload from "../utils/downloadApp";

function ThanksDownload(props) {
  // Determine the container class based on the "downloaded" prop
  const containerClass = `thanks-download ${props.downloaded ? "active" : ""}`;
  return (
    <div className={containerClass}>
      <h3>Thanks for downloading...</h3>
      <img src="/resources/thanks.png" alt="" width={300} height={300} />
      <p>
        If the download wasn't started click{" "}
        {/* Trigger the handleDownload function when the link is clicked */}
        <strong onClick={handleDownload}>here</strong>
      </p>
    </div>
  );
}

export default ThanksDownload;
