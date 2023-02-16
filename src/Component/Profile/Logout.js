import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ExpensePage.module.css";
import AuthContext from "../Context/AuthContext";

function Logout() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
  history.replace('/Authpage')
  };
  return (
    <div>
      <button className={classes.but} onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Logout;