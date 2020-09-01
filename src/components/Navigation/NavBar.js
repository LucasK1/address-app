import React from 'react';

import NavItems from './NavItems/NavItems';

import * as classes from './NavBar.module.css';

const NavBar = (props) => {
  return (
    <div className={classes.NavBar}>
      <img src={require('../../assets/logo.png')} alt="Address Book logo" />
      <NavItems />
    </div>
  );
};

export default NavBar;
