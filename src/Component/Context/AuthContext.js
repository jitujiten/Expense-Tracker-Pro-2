import {createContext} from "react";
 
 const AuthContext = createContext({
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
    tokenid:'',
    userdata:'',
 })
 export default AuthContext;