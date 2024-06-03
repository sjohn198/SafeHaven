import React, { useState } from "react";

function ProfileEdit(props) {
  const [userProfile, setLogin] = useState({
    bio: "",
    skills: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "skills") {
      setLogin({ bio: userProfile["bio"], skills: value });
    } else setLogin({ bio: value, skills: userProfile["skills"] });
  }

  function submitForm() {
    props.handleSubmit(userProfile);
    setLogin({ bio: "", skills: "" });
  }

  return (
    <form>
      <label htmlFor="bio">bio</label>
      <textarea
        type="text"
        name="bio"
        id="bio"
        value={userProfile.bio}
        onChange={handleChange}
      />
      <label htmlFor="skills">skills</label>
      <textarea
        type="text"
        name="skills"
        id="skills"
        value={userProfile.skills}
        onChange={handleChange}
      />
      <input type="button" value="Change Profile" onClick={submitForm} />
    </form>
  );
}

export default ProfileEdit;
