import { Fragment, useContext } from "react";
import LogIn from "./Component/Login/Login";
import AuthContext from "./Component/Context/Auth-Context/Auth-Context";
import { Route, Switch,Redirect } from "react-router-dom";
import Profile from "./Component/Profile/Profile";




function App() {
  const ctx = useContext(AuthContext);

  const isLoggedIn = ctx.isLoggedIn || localStorage.getItem("tokenid");

  return (
    <Fragment>
      {!isLoggedIn && (
        <Route path="/">
          <LogIn />
        </Route>
      )}
      {isLoggedIn && (
        <div className="container-fluid">
        <Switch>
         <Route path="/" exact>
            <Redirect to="/profile"/>
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
        </div>
      )}
    </Fragment>
    
  );
}

export default App;
