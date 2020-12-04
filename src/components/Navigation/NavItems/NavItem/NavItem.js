import React from 'react';
import { NavLink } from 'react-router-dom';
import * as classes from './NavItem.module.css';

const NavItem = ({ pathName, children }) => {
  return (
    <li className={classes.NavItem}>
      <NavLink
        activeClassName={classes.NavItem_Link__active}
        className={classes.NavItem_Link}
        exact
        to={pathName}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
