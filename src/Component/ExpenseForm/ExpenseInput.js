import React from "react";
import classes from "./ExpenseInput.module.css";
const ExpenseInput = (props) => {
  console.log(props.printexpense, "from inpuptpage");

  const deleteHandler = (item) => {
    props.onRemove(item);
    const inputid = item.id;
    fetch(
      `https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense/${inputid}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log(inputid, "id from detelfunction expenseform ");
  };
  const EditHandler = async (item) => {
   
    const inputid = item.id;
    try {
      const response = await fetch(
        `https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense/${inputid}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        props.onEdit(item);
      } else {
        throw data.error;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className={classes.expenseInput}>
          <ul>
            <li>
              <label>Expense Amount</label>
              <span className={classes.data}>{props.item.enteredExpense} </span>
              <label>Details</label>
              <span className={classes.data}> {props.item.enteredDetails}</span>
              <label>Category</label>
              <span className={classes.data}>
                {" "}
                {props.item.enteredCategory}
              </span>
              <span>
                <button onClick={() => EditHandler(props.item)}>Edit</button>
              </span>
              <span>
                <button onClick={() => deleteHandler(props.item)}>
                  Delete
                </button>
              </span>
              <hr></hr>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ExpenseInput;
