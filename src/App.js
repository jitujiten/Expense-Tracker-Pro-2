import React, { useContext } from "react";
import AuthForm from "./Component/Context/AuthForm";
import { Route, Switch, Redirect } from "react-router-dom";
import ExpensePage from "./Component/Profile/ExpensePage";
import AuthContext from "./Component/Context/AuthContext";
import ProfilForm from "./Component/Profile/ProfileForm";
import Logout from "./Component/Profile/Logout";
import PasswordChange from "./Component/Context/PasswordChanger";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      {" "}
      {!authCtx.isLoggedIn && (
        <Route path="*">
          <Redirect to="/Authpage" />
        </Route>
      )}{" "}
      {authCtx.isLoggedIn && <Logout />}
      <Switch>
        {" "}
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage" exact>
            <ExpensePage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage:ProfilePage">
            <ProfilForm />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/Authpage">
            <AuthForm />
          </Route>
        )}
        <Route path="/ChangePassword">
          <PasswordChange />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
export default App;
