import React from 'react';
import * as classes from './Button.module.css';

const Button = ({ small, red, submitted, children }) => {
  let classArray = [classes.Button];

  small ? classArray.push(classes.Small) : classArray.push(classes.Big);
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
