import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import NavItems from './NavItems/NavItems';

import * as classes from './NavBar.module.css';
import { useState } from 'react';

const NavBar = ({ isMainPage }) => {
  let classArray = [classes.NavBar];

  if (!isMainPage) {
    classArray.push(classes.NavBar__alt);
  } else {
    classArray.push(classes.NavBar__basic);
  }

  return (
    <div className={classArray.join(' ')}>
      <NavLink to="/">
        <img src={require('../../assets/logo1.png')} alt="Address Book logo" />
      </NavLink>
      <NavItems />
    </div>
  );
};

export default NavBar;
