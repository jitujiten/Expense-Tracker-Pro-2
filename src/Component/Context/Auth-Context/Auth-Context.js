import React,{useState} from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    Login:(token)=>{},
    Logout:()=>{}
})

export const AuthContextProvider=(props)=>{

    const [token,setToken]=useState(null);

    const userisLoggedin=!!token;


    const LogedInHandler=(token)=>{
        setToken(token);
    }

    const LogedOutHandler=()=>{
        setToken(null);
    }

    const Contextvalue={
    token:token,
    isLoggedIn:userisLoggedin,
    Login:LogedInHandler,
    Logout:LogedOutHandler
    }

 return <AuthContext.Provider value={Contextvalue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;