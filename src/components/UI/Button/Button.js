import React from 'react';
import * as classes from './Button.module.css';

const Button = ({ small, medium, big, red, submitted, children }) => {
  let classArray = [classes.Button];

  if (small) {
    classArray.push(classes.Small);
  } else if (medium) {
    classArray.push(classes.Medium);
  } else if (big) {
    classArray.push(classes.Big);
  }
  if (red) {
    classArray.push(classes.Red);
  }

  return (
    <button onClick={submitted} className={classArray.join(' ')}>
      {children}
    </button>
  );
};

export default Button;
