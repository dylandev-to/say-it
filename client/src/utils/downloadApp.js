const handleDownload = () => {
  // Replace the URL with the actual path to your APK file
  const apkDownloadUrl = "/app/SayIt.apk";

  // Create a temporary anchor element
  const anchor = document.createElement("a");
  anchor.href = apkDownloadUrl;
  anchor.target = "_blank"; // Open in a new tab
  anchor.download = "SayIt.apk"; // Specify the file name

  // Trigger a click on the anchor to start the download
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

export default handleDownload;