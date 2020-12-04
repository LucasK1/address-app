import React from 'react';

import * as classes from './Input.module.css';

const Input = ({ elementType, elementConfig, value, changed, submitted }) => {
  let inputElement = null;
  let inputClasses = [classes.Input];

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}></textarea>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitted(e);
            }
          }}
        />
      );
  }

  return <>{inputElement}</>;
};

export default Input;
