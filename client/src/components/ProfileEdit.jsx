import React, { useEffect, useState } from "react";
import "../styles/profileedit.css";
import axios from "axios";

const ProfileEdit = (props) => {

  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

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

  const onSaveProfile = async () => {
    try {
      const data = {
        name: name,
        pronouns: pronouns,
        description: description,
        profilePicture: profilePicture
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
        console.log("User updated:", response.data);
      }
    } catch (error) {
      console.error("Error updating user:", error.response.data);
    }
  };

  useEffect(() => {
    setName(props.profileInfo?.name);
    setPronouns(props.profileInfo?.pronouns);
    setDescription(props.profileInfo?.description);
    setProfilePicture(props.profileInfo?.profilePicture)
  }, [props.editing]);

  return (
    <div
      style={{
        display: props.editing ? "flex" : "none",
      }}
      className="profileEdit"
    >
      <h3>Edit Profile</h3>
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
            <img src={profilePicture ?? "/resources/profile.svg"} width={100} height={100} alt="" />
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
