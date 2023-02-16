import { useState } from "react";

import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };
  const ProfileHandler = (data) => {
    setProfile(data);
  };

  const authcontext = {
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    tokenid: token,
    ProfileDetails: ProfileHandler,
    profile: profile,
  };
  console.log(profile, "form auth provider");
  return (
    <AuthContext.Provider value={authcontext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
