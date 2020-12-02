import React from 'react';

import * as classes from './Input.module.css';

const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.Input];

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}></textarea>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              props.submitted(e);
            }
          }}
        />
      );
  }

  return <>{inputElement}</>;
};

export default Input;
