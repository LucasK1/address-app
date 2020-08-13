import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import * as classes from './Modal.module.css';

const Modal = React.memo((props) => {
  return (
    <Aux>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0',
        }}>
        {props.children}
      </div>
    </Aux>
  );
});

export default Modal;
