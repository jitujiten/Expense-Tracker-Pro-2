import "./Profile.css";
import React, { useState,useContext } from "react";
import Contact from "./Contact/Contact";
import AuthContext from "../Context/Auth-Context/Auth-Context";

const Profile = () => {

  const ctx=useContext(AuthContext);

  const [profile, setprofile] = useState(false);

  const profileHandler = () => {
    setprofile(true);
  };

  const profilecanceling = () => {
    setprofile(false);
  };

  const logouthandler=()=>{
    ctx.Logout();
    localStorage.removeItem("tokenid");
    localStorage.removeItem("emailid");
  }


  return (
    <React.Fragment>
      <div className="row justify-content-evenly">
        <div className="col-3 mt-1 mb-2">
          <p>WelCome to ExpenseTracker!!!</p>
          <button className="btn btn-danger" onClick={logouthandler}>LogOut</button>
        </div>
      
        <div className="col-5">
          <div className="profile_div">
            <p>
              Your Profile is Incomplete.
              <span className="btn btn-link" onClick={profileHandler}>
                Complete Now
              </span>
            </p>
          </div>
        </div>
        <hr></hr>
      </div>
      {profile && <Contact oncancel={profilecanceling} />}
    </React.Fragment>
  );
};

export default Profile;
