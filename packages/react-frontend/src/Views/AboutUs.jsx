import React from "react";
import "../Styles/Profile.css";
import "../Styles/Navbar.css";

function AboutUs() {

  return (
    <div>
      <div className="about-us-container">
        <div className="profile-bio">
          <h3>About Us</h3>
          <div>
            <text>
                SafeHaven is a company dedicated to optimizing storage management solutions for businesses. 
                Our product scales easily, displays critical order insights, and is affordably priced.
            </text>            
          </div>
          <div>
            <text>Choose SafeHaven!</text>
          </div>
        </div>
      </div>
      <div className="bottom-margin"></div>
    </div>
  );
}

export default AboutUs;