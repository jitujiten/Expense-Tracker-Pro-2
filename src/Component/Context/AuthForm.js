import React, { useState, useRef } from "react";
import { useHistory, NavLink } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthRedux";

function AuthForm() {

  const dispatch=useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [isValid, setIsValid] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModelHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  }

  const handlePasswordchange = (event) => {
    setPassword(event.target.value);
  };
  const hadleConfirmPasswordChange = (event) => {
    setconfirmPassword(event.target.value);
    setIsValid(validateConfirmPassword(password, event.target.value));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredpassword = passwordInputRef.current.value;
    if (password === confirmPassword && !isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredpassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log("Successfull");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredpassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let erroMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                erroMessage = data.error.message;
              }
              throw new Error(erroMessage);
            });
          }
        })
        .then((data) => {
          dispatch(authActions.login(data.idToken));
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", data.email);
          history.replace("/ExpensePage");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className="row">
      <div className="col-4"></div>
      <div className="col-6">
        <section>
          <div className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
              <div>
                <div>
                  {" "}
                  <label htmlFor="email">Email</label>
                </div>
                <div>
                  <input
                    type="email"
                    ref={emailInputRef}
                    required
                    autoComplete="email"
                  ></input>
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="password">Password</label>
                </div>
                <div>
                  <input
                    type="password"
                    onChange={handlePasswordchange}
                    value={password}
                    ref={passwordInputRef}
                    autoComplete="password"
                    required
                  ></input>
                </div>
              </div>
              {!isLogin && (
                <div>
                  <div>
                    {" "}
                    <label htmlFor="confirm password">Confirm Password</label>
                  </div>
                  <div>
                    <input
                      type="password"
                      onChange={hadleConfirmPasswordChange}
                      value={confirmPassword}
                      ref={passwordInputRef}
                      required
                    ></input>
                    {isValid ? null : (
                      <p style={{ color: "red" }}>
                        {" "}
                        ! password do not match...
                      </p>
                    )}
                  </div>
                </div>
              )}
              <div>
                <button>{isLogin ? "Login" : "Sing up"}</button>
                <div>
                  <button type="button" onClick={switchAuthModelHandler}>
                    {isLogin ? "Create new account" : "Have an account ? Login"}
                  </button>
                </div>
              </div>
            </form>
            <div>
              {isLogin && (
                <NavLink
                  style={{textDecoration: "none", color: "red" }}
                  to="/ChangePassword"
                >
                  {" "}
                  Forgot password?{" "}
                </NavLink>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthForm;
