import React from 'react';
import * as classes from './Button.module.css';

const Button = (props) => {
  let classArray = [classes.Button];

  props.small ? classArray.push(classes.Small) : classArray.push(classes.Big);
  if (props.red) {
    classArray.push(classes.Red);
  };

  return (
    <button onClick={props.submitted} className={classArray.join(' ')}>
      {props.children}
    </button>
  );
};

export default Button;
