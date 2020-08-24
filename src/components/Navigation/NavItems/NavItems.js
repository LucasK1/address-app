import React from 'react';
import NavItem from './NavItem/NavItem';
import * as classes from './NavItems.module.css';

const NavItems = () => {
  return (
    <nav>
      <ul className={classes.NavItems}>
        <NavItem pathName="/">Home</NavItem>
        <NavItem pathName="/addresses">Addresses</NavItem>
      </ul>
    </nav>
  );
};

export default NavItems;
