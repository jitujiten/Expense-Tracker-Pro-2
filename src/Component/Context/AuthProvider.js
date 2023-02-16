import { useState } from "react";

import AuthContext from "./AuthContext";

const AuthProvider = (props) => {

  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [profile, setProfile] = useState(null);
  const userIsLoggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token)
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
    localStorage.removeItem('data')
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
  
  return (
    <AuthContext.Provider value={authcontext}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
