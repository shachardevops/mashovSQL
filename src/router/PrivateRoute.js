import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({
  isStudent,
  isAdmin,
  component: Component,
  ...rest
}) => {
    if(isAdmin||isStudent) {
    return(<Route {...rest} component={(props) => (
        <Component {...props} />
      )} />);
  }else{
    
  return(<Redirect to="/" />)  
  }
}
  export default PrivateRoute;