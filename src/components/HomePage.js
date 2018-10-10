import React from 'react';
import { NavLink } from 'react-router-dom';


const HomePage = () => (
    <NavLink  className="Link" to="/" activeClassName="is-active" exact={true}>HomePage</NavLink>

);

export default HomePage;
