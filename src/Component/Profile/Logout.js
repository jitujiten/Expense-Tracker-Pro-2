import { useHistory } from "react-router-dom";
import classes from "./ExpensePage.module.css";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../Store/AuthRedux";



function Logout() {
  const  dispatch = useDispatch()
  const history = useHistory();

  useSelector((state)=>state.expenseitem.token)
  const logoutHandler = () => {
  history.replace('/Authpage')
  dispatch(authActions.logout(null))
  };
  return (
    <div>
      <button className={classes.but} onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Logout;