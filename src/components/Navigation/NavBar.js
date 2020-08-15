import React from 'react';
import * as classes from './NavBar.module.css';
import NavItems from './NavItems/NavItems';

const NavBar = (props) => {
  return (
    <div className={classes.NavBar}>
    <NavItems />
    </div>
  );
};

export default NavBar;
