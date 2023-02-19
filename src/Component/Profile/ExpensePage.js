import React from "react";
import PageHeader from "./PageHeader";
import classes from "./ExpensePage.module.css";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import { useSelector } from "react-redux";


function ExpensePage() {

  const idtoken = useSelector((state)=>state.auth.token)
  const submitHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD5Ls-KCDVH0n1SoRjuqDNCBEmY10N3zaY",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: idtoken,
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
            let errormessage = "Authentication failed";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("success");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

   

  return (
    <React.Fragment>
       <PageHeader />
      <hr></hr>
      <form onSubmit={submitHandler}>
        <div className={classes.expensepage}>
          {" "}
          <label htmlFor="emailverification">Please Verify Your Email..</label>
          <button className={classes.but}>Email Verificatin</button>
        </div>
      </form>
      <ExpenseForm></ExpenseForm>
    </React.Fragment>
  );
}

export default ExpensePage;
