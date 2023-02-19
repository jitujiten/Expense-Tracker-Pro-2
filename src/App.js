import React, { useEffect } from "react";
import AuthForm from "./Component/Context/AuthForm";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  themeAction,
} from "./Component/Store/AuthRedux";

import ReactSwitch from "react-js-switch";
import "../src/Dark_light.css";
import { Suspense } from "react";
import { fectingAllData } from "./Component/Store/expense-actions";

const ExpensePage = React.lazy(() => import("./Component/Profile/ExpensePage"));
const ProfilForm = React.lazy(() => import("./Component/Profile/ProfileForm"));
const Logout = React.lazy(() => import("./Component/Profile/Logout"));
const PasswordChange = React.lazy(()=>import("./Component/Context/PasswordChanger"))

const spinner=<div className="spinner-border text-success" role="status">
</div>




function App() {
  

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const premium = useSelector((state) => state.theme.premium);
  const activePremium = useSelector((state) => state.theme.cvandDark);

  const toggleThem = () => {
    dispatch(themeAction.changeTheme());
  };
  
  useEffect(() => {
    dispatch(fectingAllData())
  }, [dispatch])

  return (
    <React.Fragment>

      <Suspense  fallback={spinner}>
      <div id={darkMode}>
        {" "}
        {isLoggedIn && activePremium && (
          <div className="switch">
            <label>{darkMode === "light" ? "Light Mode" : "Dark Mode"}</label>
            <ReactSwitch onChange={toggleThem} />
          </div>
        )}

        {isLoggedIn && <Logout/>}
        
        <Switch>
          {!isLoggedIn && (
            <Route path="/Authpage">
              <AuthForm />
            </Route>
          )}
          <Route path="/ChangePassword">
            <PasswordChange />
          </Route>{" "}
          {isLoggedIn && (
            <Route path="/ExpensePage" exact>
              <ExpensePage />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/ExpensePage:ProfilePage">
              <ProfilForm  />
            </Route>
          )}
          {!isLoggedIn && (
            <Route path="*">
              <Redirect to="/Authpage" />
            </Route>
          )}
        </Switch>
      </div>
      </Suspense>
    </React.Fragment>
  );
}

export default App;