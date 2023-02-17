import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import classes from "./ExpenseForm.module.css";
import ExpenseInput from "./ExpenseInput";



const ExpenseForm = (props) => {
  const [enteredExpense, setEnteredExpense] = useState("");
  const [enteredDetails, setEnteredDetails] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [printexpense, setPrintExpense] = useState([]);
  const amountRef = useRef();
  const DetailRef = useRef();
  const CategoryRef = useRef();

  const EditExpenseHandler = (item) => {
    amountRef.current.value = item.enteredExpense;
    DetailRef.current.value = item.enteredDetails;
    CategoryRef.current.value = item.enteredCategory;
    const updatedExpense = printexpense.filter((expense) => {
      return expense.id !== item.id;
    });
    setPrintExpense(updatedExpense);
  };
  console.log(printexpense, "from expnesepage");

  ///////******************* */

  const removeItemHanler = (data) => {
    let removeitem = printexpense.findIndex((item) => item.id === data.id);
    const arr = [...printexpense];
    const updateItems = arr.splice(removeitem, 1);
    console.log(updateItems);
    setPrintExpense(arr);
  };
//////////////////////////////////********* */

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

if(enteredExpense===""||enteredDetails===""){
    return;
}


    const obj = {
      enteredExpense,
      enteredDetails,
      enteredCategory,
      __id: Math.random().toString(),
    };
    fetch("https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense.json", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res, "form post data");
          return res.json();
        })
        .catch((err) => {
          console.log(err.message);
        });
      setPrintExpense((prevexpense) => {
        return [obj, ...prevexpense];
      });
    };
    const fetchExpenses = useCallback(async () => {
      try {
        const res = await fetch(
          "https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          const newdata = [];
          for (let key in data) {
            newdata.push({ id: key, ...data[key] });
          }
  
          setPrintExpense(newdata);
        } else {
          throw data.error;
        }
      } catch (error) {
        console.log(error.message);
      }
    },[]);
  
    useEffect(() => {
      fetchExpenses();
    },[fetchExpenses]);
 

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-6">
       <div>
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
                  <option>Food</option>
                  <option>Petrol</option>
                  <option>Salary</option>
                  <option>Travlling</option>
                  <option>Study</option>
                  <option>House_Keeping</option>
                </select>
              </div>
              <div>
                <button>Submit</button>
              </div>
            </div>
          </form>
          </div>
          {printexpense.map((item) => (
        <ExpenseInput
          key={item.__id}
          id={item.id}
          item={item}
          onRemove={removeItemHanler}
          onEdit={EditExpenseHandler}
        />
      ))}
        </div>
      </div>
    </div>
  );
};
export default ExpenseForm;
