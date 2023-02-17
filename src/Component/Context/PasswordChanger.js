import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./AuthForm.module.css";

function PasswordChange() {
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredemail = emailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredemail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errormessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        emailRef.current.value = "";
        console.log(data);
       console.log("success");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className="row">
      <div className="col-4"></div>
      <div className="col-6">
        <form onSubmit={submitHandler}>
          <div className={classes.auth}>
            <div>
              <label>Enter the email which you have registered.</label>
            </div>
            <div>
              <input type="email" ref={emailRef}></input>
            </div>
            <div>
              <button>Send Link</button>
              {isLoading && (
                <div>
                  <p>Sending link</p>
                  <div
                    className="spinner-border text-warning ms-4"
                    role="status"
                  ></div>
                </div>
              )}
            </div>
            <NavLink
              style={{ textDecoration: "none", color: "red" }}
              to="/Authpage"
            >
              Alreary a user?Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordChange;
