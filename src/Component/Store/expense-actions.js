import axios from "axios";
import { ExpenseAction } from "./AuthRedux";
if (!localStorage.getItem("email")) {
  localStorage.setItem("email", "");
}

 let  email = localStorage.getItem("email").replace(".", "").replace("@", "");

export const fectingAllData = () => {
  return async (dispatch) => {
    const fecthData = async () => {
      try {
        const res = await axios.get(
          `https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense${email}.json`
        );
        const loadedExpenses = [];
        for (const key in res.data) {
          loadedExpenses.push({
            id: key,
            enteredExpense: res.data[key].enteredExpense,
            enteredDetails: res.data[key].enteredDetails,
            enteredCategory: res.data[key].enteredCategory,
          });
        }
        return loadedExpenses;
      } catch (error) {
        console.log(error);
      }
    };
    const data = await fecthData();
    dispatch(ExpenseAction.fetchAllexpenses(data));
  };
};

export const addingExpenses = (obj) => {
  return async (dispatch) => {
    const addExpense = async () => {
      try {
        const res = await axios.post(
          `https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense${email}.json`,
          obj
        );
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };
    const id = await addExpense();
    const temp = { id: id, ...obj };
    dispatch(ExpenseAction.addexpense(temp));
  };
};

export const EditingExpenses = (id,obj) => {
    return async (dispatch) => {
      const editExpense = async () => {
        try {
          const res = await axios.put(
            `https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense${email}/${id}.json`, obj
          );
          console.log(res.data)
        } catch (error) {
          console.log(error);
        }
      };
      await editExpense();
      const temp = {id:id, ...obj}
      dispatch(ExpenseAction.editExpense(temp));
    };
  };

export const removingExpenses = (id) => {
  return async (dispatch) => {
    const removeExpense = async () => {
      try {
         await axios.delete(
          `https://expense-tracker-58883-default-rtdb.firebaseio.com/Expense${email}/${id}.json`
        );
      } catch (error) {
        console.log(error);
      }
    };
    await removeExpense();
    dispatch(ExpenseAction.removeExpense(id));
  };
};