import React from 'react';
import {Route} from 'react-router-dom';

const HOC = ({
    StudentAccess,
    AdminAccess,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={
        (props) =>  (
        <Component {...props} AdminAccess={AdminAccess} StudentAccess={StudentAccess}/>  
    )} />
  );
  export default HOC;