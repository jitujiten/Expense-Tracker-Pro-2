import { useState } from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const [enteredExpense, setEnteredExpense] = useState("");
  const [enteredDetails, setEnteredDetails] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  const expenseHandler = (event) => {
    setEnteredExpense(event.target.value);
  };
  const detailsHandler = (event) => {
    setEnteredDetails(event.target.value);
  };
  const categoryHandler = (event) => {
    setEnteredCategory(event.target.value);
  };
  const SubmitHandler = (event) => {
    event.preventDefault();

    const obj = {
      enteredExpense,
      enteredDetails,
      enteredCategory,
    };
    props.ondata(obj);
    setEnteredExpense("");
    setEnteredDetails("");
    setEnteredCategory("");
  };

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-6">
        <div className={classes.expensefrom}>
          <h1>EXPENSE TRACKER</h1>
          <form onSubmit={SubmitHandler}>
            <div className={classes.input}>
              <div>
                {" "}
                <label htmlFor="Expense Amount">Expense Amount</label>
              </div>{" "}
              <div>
                <input
                  type="text"
                  value={enteredExpense}
                  onChange={expenseHandler}
                  required
                ></input>
              </div>
              <div>
                {" "}
                <label htmlFor="Details">Details</label>
              </div>{" "}
              <div>
                <input
                  type="text"
                  value={enteredDetails}
                  onChange={detailsHandler}
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <select onChange={categoryHandler} value={enteredCategory}>
                  <option >Food</option>
                  <option >Petrol</option>
                  <option >Salary</option>
                  <option >Travlling</option>
                  <option >Study</option>
                  <option >House_Keeping</option>
                </select>
              </div>
              <div>
                <button>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ExpenseForm;
