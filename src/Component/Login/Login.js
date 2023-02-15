import React, { useState, useRef, useContext } from "react";
import AuthContext from "../Context/Auth-Context/Auth-Context";
import classes from "./Login.module.css";
import Passwordchanger from "./PasswordChange";

const LogIn = (props) => {
  const emailItnputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpassword=useRef();

  const ctx = useContext(AuthContext);
  
  const [changepassworddisplay,setchangepass]=useState(false);
  
  const [isLogin, setIsLogin] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const passwordchanger=()=>{
    setchangepass(true);
  }

  const cancellinghandler=()=>{
    setchangepass(false);
  }


  const submitHandler = (e) => {

    e.preventDefault();

   
 let  enteredemail = emailItnputRef.current.value;
  let enteredpassword = passwordInputRef.current.value;
  let Confirmpassword =confirmpassword.current.value;

  if (enteredpassword !== Confirmpassword) {
    alert("password are not same");
    return;
  }

   
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredemail,
        password: enteredpassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          emailItnputRef.current.value = "";
          passwordInputRef.current.value = "";
          confirmpassword.current.value = "";
         
          
          return res.json();
        } else {
          return res.json().then((data) => {
            let errmessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errmessage = data.error.message;
            }
            throw new Error(errmessage);
          });
        }
      })
      .then((data) => {
        ctx.Login(data.idToken);
        if(!isLogin){
          console.log("User has successfully signed up.");
        }else{
          console.log("User has successfully Loged In.");
        }
        localStorage.setItem("tokenid", data.idToken);
        localStorage.setItem("emailid", data.email);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
     {!changepassworddisplay && <> <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            required
            ref={emailItnputRef}
            placeholder="Email"
            
          />
        </div>
        <div className={classes.control}>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
            placeholder="Password"
            autoComplete="password"
          />
        </div>
      <div className={classes.control}>
          <input
            type="password"
            id="confirm-password"
            required
            ref={confirmpassword}
            placeholder="Confirm Password"
            autoComplete="password"
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Sign Up"}</button>}
          {isLoading && <p>Sending Request....</p>}
          {isLogin &&<span className="btn btn-link" onClick={passwordchanger}>forgot Password</span>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin
              ? "Dont't have an account?sign up"
              : "Have an account?LogIn"}
          </button>
        </div>
      </form>
      </>
      }
     {changepassworddisplay && <Passwordchanger oncanceling={cancellinghandler}/>} 
    </section>
  );
};

export default LogIn;
