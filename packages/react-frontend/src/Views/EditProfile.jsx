import React, { useState, useEffect } from "react";
import ProfileEdit from "../Components/ProfileEdit";
import "../Styles/Profile.css";
import Cookies from "js-cookie";
import { addAuthHeader } from "../Components/helpers";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  function changeProfile(profile){
    fetch("https://safehavenapp.azurewebsites.net//users/profile", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(profile)
    })
      .then((response) => {
        if (!response.ok) {
          // Handle the case where the server returns an error
          throw new Error("User Not Found (Invalid Token)");
        }
        navigate("/profile");
      });
  }
  return (
    <div className="ProductList">
      <h1>Edit Profile:</h1>
      <ProfileEdit handleSubmit={changeProfile} />
    </div>
  );
}

export default EditProfile;
