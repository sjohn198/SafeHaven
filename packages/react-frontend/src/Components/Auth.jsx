import React, { useState } from "react";

function Auth(props) {
  const [userAuth, setLogin] = useState({
    username: "",
    password: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "password") {
      setLogin({ username: userAuth["username"], password: value });
    } else setLogin({ username: value, password: userAuth["password"] });
  }

  function submitForm() {
    props.handleSubmit(userAuth);
    setLogin({ username: "", password: "" });
  }

  return (
    <form>
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={userAuth.username}
        onChange={handleChange}
      />
      <label htmlFor="password">password</label>
      <input
        type="text"
        name="password"
        id="password"
        value={userAuth.password}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Auth;
