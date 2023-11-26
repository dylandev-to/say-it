/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../styles/profileedit.css";
import axios from "axios";

// ProfileEdit component allows users to edit their profile information
const ProfileEdit = (props) => {
  // State variables for user profile information
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  // Event handlers for input changes
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePronounsChange = (event) => {
    setPronouns(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to save the edited profile information
  const onSaveProfile = async () => {
    try {
      const data = {
        name: name,
        pronouns: pronouns,
        description: description,
        profilePicture: profilePicture,
      };

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}${"/api/users"}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating user:", error.response.data);
    }
  };

  // Function to close the profile editing modal
  const onCloseProfile = () => {
    props.setEditing(false);
  };

  // Set initial values for profile information when editing starts
  useEffect(() => {
    setName(props.profileInfo?.name);
    setPronouns(props.profileInfo?.pronouns);
    setDescription(props.profileInfo?.description);
    setProfilePicture(props.profileInfo?.profilePicture);
  }, [props.editing]);

  // JSX structure for the ProfileEdit component
  return (
    <div
      style={{
        display: props.editing ? "flex" : "none",
      }}
      className="profileEdit"
    >
      <div className="title">
        <h3>Edit Profile</h3>
        <svg
        onClick={() => onCloseProfile()}
         viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
              fill="#0F0F0F"
            ></path>{" "}
          </g>
        </svg>
      </div>
      <div className="inputPfp">
        <label htmlFor="profilePictureInput">
          <input
            id="profilePictureInput"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />
          <div className="pfp">
            <img
              src={profilePicture ?? "/resources/profile.svg"}
              width={100}
              height={100}
              alt=""
            />
          </div>
        </label>
      </div>

      <div className="input">
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
      </div>
      <div className="input">
        <p>Pronouns</p>
        <select value={pronouns} onChange={handlePronounsChange}>
          <option value="">Select Pronouns</option>
          <option value="he/him">He/Him</option>
          <option value="she/her">She/Her</option>
          <option value="they/them">They/Them</option>
        </select>
      </div>
      <div className="input">
        <p>Description</p>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Description"
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <button
        onClick={() => {
          onSaveProfile();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default ProfileEdit;
