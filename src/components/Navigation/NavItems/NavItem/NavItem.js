import React from 'react';
import { Link } from 'react-router-dom';
import * as classes from './NavItem.module.css';

const NavItem = (props) => {
  return (
    <li className={classes.NavItem}>
      <Link className={classes.NavItem_Link} to={props.pathName}>{props.children}</Link>
    </li>
  );
};

export default NavItem;
