import React from "react";
import { Redirect, Route } from "react-router";
import Routes from './RouteConstant'

const AuthRoute = props => {
  const { type } = props;

  const userToken =  localStorage.getItem('elililly-user-token') || false 
  console.log("userToken---", userToken)
  
  if (type == "guest" && userToken) return <Redirect to={Routes.DASHBOARD} />;
  else if (type === "private" && !userToken) return <Redirect to={Routes.ROOT} />;

  return <Route {...props} />;
};


export default AuthRoute;