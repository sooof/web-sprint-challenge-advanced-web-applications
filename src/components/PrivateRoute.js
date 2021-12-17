import React from "react";
import { Route , Redirect} from "react-router-dom";

function PrivateRoute({component:Component, ...rest}) {
  // console.log("PrivateRoute")
  // console.log("token",localStorage.getItem("token"))
  return (<Route {...rest} render={()=>{
    if(localStorage.getItem('token')){
      console.log("in if")
        return <Component />
    }else {
        return <Redirect to="/login" />
    }
  }}/>);
}

export default PrivateRoute;

//Task List:
//1. Complete PrivateRoute