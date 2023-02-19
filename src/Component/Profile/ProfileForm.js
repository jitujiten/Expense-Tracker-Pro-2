import React, { useRef} from "react";
import classes from "./PageHeader.module.css";
import classes1 from "./ProfileForm.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


function ProfilForm() {
 
  const  idtoken = useSelector((state)=>state.auth.token)
  const nameRef = useRef();
  const photourlRef = useRef();

  const history=useHistory();
  const cancelinghandler=()=>{
    history.goBack();
  }



  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredUrl = photourlRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idtoken,
          displayName: enteredName,
          photoUrl: enteredUrl,

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
        console.log("seccess");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

 
  const getdata = JSON.parse(localStorage.getItem('data'))    

  return (
   
    <div className="row">
    <div className="col-12">
      <header className={classes.pageheader}>
        {" "}
        <div>Winners never quite, Quitters never win.</div>{" "}
        <span>
          Your profile is 64% completes. A complete Profile has Higher chances
          of landing a job.
          <NavLink
            style={{ textDecoration: "none" }}
            to="/ExpensePage:ProfilePage"
          >
            Complete now
          </NavLink>
        </span>{" "}
      </header>
      <hr />
      <div className="row">
      <div className="col-md-8">
      <form onSubmit={submitHandler}>
        <div className={classes1.profile}>
          <div className={classes1.contact}>
            <h2>Contact Details </h2>
              <button onClick={cancelinghandler}>Cancel</button>
          </div>
          <div className={classes1.form}>
            <div>
              <label htmlFor="name">Full Name:</label>
            </div>
            <div>
              <input
                type="text"
                ref={nameRef}
                defaultValue={getdata.users[0].displayName}
              ></input>
            </div>
            <div>
              {" "}
              <label htmlFor="img"> Profile Photo URL</label>
            </div>
            <div>
              {" "}
              <input
                type="text"
                ref={photourlRef}
                defaultValue={getdata.users[0].photoUrl}
              ></input>
            </div>
          </div>
          <div>
            <button className={classes1.button}>Update</button>
          </div>
          <hr />
        </div>
      </form>
      </div>
      </div>
      </div>
      </div>
  );
}

export default ProfilForm;
