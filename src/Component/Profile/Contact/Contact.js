import React,{useRef,useContext} from "react";
import github from "../Images/pngimg.comgithub_PNG33.png";
import globe from "../Images/—Pngtree—vector globe icon_3787753.png";
import "./Contact.css";
import AuthContext from "../../Context/Auth-Context/Auth-Context";
const Contact = (props) => {

  const ctx=useContext(AuthContext);


const nameref=useRef();
const urlref=useRef();

const formhandler=(e)=>{
  e.preventDefault();

const name=nameref.current.value;
const url=urlref.current.value;

console.log(name,url)

fetch(
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY",
  {
    method: "POST",
    body: JSON.stringify({
      idToken: ctx.token,
      displayName:name,
      photoUrl:url,
      returnSecureToken: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
).then((res) => {
 alert("user Profile updated successfully")
 
nameref.current.value="";
urlref.current.value="";
props.oncancel();
});

}



  return (
    <div className="row justify-content-evenly">
      <div className="col-3"></div>
      <div className="col-7">
        <button id="cancel" className="btn btn" onClick={props.oncancel}>
          cancel
        </button>
        <h4>Contact Details</h4>
        <form onSubmit={formhandler}>
          <img id="git" className="img-fluid w-50" src={github} alt="git" />
          <label>FullName:</label>
          <input type="text" required  ref={nameref}/>
          <img id="git" className="img-fluid w-50" src={globe} alt="git" />
          <label>Profile Photo URL:</label>
          <input type="link" required  ref={urlref}/>
          <div id="btn_container">
            <button type="submit" id="btn" className="btn btn">
              Update
            </button>
          </div>
        </form>
        <hr></hr>
      </div>
    </div>
  );
};

export default Contact;
