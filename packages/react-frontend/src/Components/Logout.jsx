import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
    // Remove the cookie
    Cookies.remove('safeHavenToken');

    // Redirect to the homepage
    navigate("/");
  }, [navigate]);

  return null; // This component does not need to render anything
};

export default Logout;