import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Profile.css";
import { addAuthHeader } from "../Components/helpers";

function Profile() {
  const [profilePicture, setProfilePicture] = useState("");
  const [user, setUser] = useState({ bio: "", skills: ["", ""] });

  useEffect(() => {
    async function getUser() {
      const user_details = await axios.get(`http://localhost:8000/users`, {
        headers: addAuthHeader()
      });
      const user = user_details.data;
      setUser(user);

      const imageUrl = `http://localhost:8000/profile-picture/${user.profilePicture}`;

      setProfilePicture(imageUrl);
    }
    async function fetchProfilePicture() {
      try {
        const imageUrl = `http://localhost:8000/profile-picture/${user.profilePicture}`;
        setProfilePicture(imageUrl);
      } catch (error) {
        console.error("Failed to load user profile picture", error);
      }
    }
    if (user.profilePicture) {
      fetchProfilePicture();
    }
    getUser().catch((error) => {
      console.log(error);
    });
  }, [user.profilePicture]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("name", user.name);
      formData.append("profilePicture", file);

      try {
        // Send the file to the server for processing and storage in MongoDB
        const response = await axios.post("http://localhost:8000/profile-picture", formData, {
          headers: addAuthHeader({
            "Content-Type": "multipart/form-data"
          })
        });

        console.log(response);
        const imageUrl = `http://localhost:8000/profile-picture/${response.data}`;

        setProfilePicture(imageUrl);

        console.log("Profile picture uploaded successfully");
      } catch (err) {
        console.error("Error uploading profile picture:", err);
      }
    }
  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile-header">
          <label htmlFor="profile-picture-upload" className="profile-picture-label">
            <img className="profile-avatar" src={profilePicture} alt={user.name} />
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <span className="upload-icon">Upload</span>
          </label>
          <div className="profile-info">
            <h2 className="profile-name">{user.name}</h2>
            <p className="profile-location">{user.location}</p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
        <div className="profile-bio">
          <h3>Bio</h3>
          <p>{user.bio}</p>
        </div>
        <div className="profile-skills">
          <h3>Skills</h3>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bottom-margin"></div>
    </div>
  );
}

export default Profile;