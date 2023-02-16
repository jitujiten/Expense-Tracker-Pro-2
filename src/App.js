import React, { useContext } from "react";
import AuthForm from "./Component/Context/AuthForm";
import { Route, Switch } from "react-router-dom";
import ExpensePage from "./Component/Profile/ExpensePage";
import AuthContext from "./Component/Context/AuthContext";
import ProfilForm from "./Component/Profile/ProfileForm";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <React.Fragment>
    <div className="container-fluid">
      <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/ExpensePage" exact>
            <ExpensePage />
          </Route>
        )}
        <Route path="/ExpensePage:ProfilePage">
          <ProfilForm />
        </Route>
      </Switch>
      </div>
      {!authCtx.isLoggedIn && <AuthForm />}
    </React.Fragment>
  );
}

export default App;
