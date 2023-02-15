import React, { useRef, useContext } from "react";
import classes from "./Password.module.css";
import AuthContext from "../Context/Auth-Context/Auth-Context";

const Passwordchanger = (props) => {
  const passwordref = useRef();

  const ctx = useContext(AuthContext);

 
  const submitHandler = (e) => {
    e.preventDefault();

    const enterednewpassword = passwordref.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.token,
          password: enterednewpassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      localStorage.removeItem("tokenid");
      localStorage.removeItem("emailid");
      alert("password changed successfully")
      props.oncanceling()
    });
  };

  return (<>
    <button type="button" className="btn-close"  aria-label="Close" onClick={props.oncanceling}/>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={passwordref}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
    </>
  );
};

export default Passwordchanger;
