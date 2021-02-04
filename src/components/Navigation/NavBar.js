import React from 'react';
import { NavLink } from 'react-router-dom';

import NavItems from './NavItems/NavItems';

import * as classes from './NavBar.module.css';

const NavBar = ({ isMainPage }) => {
  let classArray = [classes.NavBar];

  if (!isMainPage) {
    classArray.push(classes.NavBar__alt);
  } else {
    classArray.push(classes.NavBar__basic);
  }

  return (
    <header className={classArray.join(' ')}>
      <div className={classes.Container}>
        <NavLink to="/" tabIndex="0">
          <img
            src={require('../../assets/logo1.png')}
            alt="Address Book logo"
          />
        </NavLink>
        <NavItems />
      </div>
    </header>
  );
};

export default NavBar;
