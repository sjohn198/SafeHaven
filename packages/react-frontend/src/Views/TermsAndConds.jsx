import React from "react";
import "../Styles/Profile.css";
import "../Styles/Navbar.css";

function TermsAndConds() {

  return (
    <div>
      <div className="about-us-container">
        <div className="profile-bio">
          <h3>Terms and Conditions</h3>
          <h4>1. Introduction</h4>
            <div>
            <text>
                Welcome to SafeHaven ("Company", "we", "our", "us"). These Terms and Conditions ("Terms") govern your use of SafeHaven ("Software"). By accessing or using the Software, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Software.
            </text>            
            </div>
            <h4>2. License</h4>
            <div>
            <text>
                SafeHaven grants you a non-exclusive, non-transferable, limited license to use the Software strictly in accordance with these Terms.
            </text>            
            </div>
            <h4>3. Restrictions</h4>
            <div>
            <text>
                You agree not to modify, distribute, sell, or lease any part of the Software, nor reverse engineer or attempt to extract the source code of the Software.
            </text>            
            </div>
            <h4>4. Updates</h4>
            <div>
            <text>
                SafeHaven may provide updates that may modify or delete certain features of the Software. You agree that SafeHaven has no obligation to provide any updates or to continue providing or enabling any particular features of the Software.
            </text>            
            </div>
            <h4>5. Termination</h4>
            <div>
            <text>
                SafeHaven may terminate or suspend your access to the Software immediately, without prior notice or liability, for any reason. Upon termination, your right to use the Software will cease immediately.
            </text>            
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default TermsAndConds;