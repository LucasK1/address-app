import React from 'react';
import * as classes from './Modal.module.css';

const Modal = React.memo(({ show, children }) => {
  return (
    <div
      className={classes.Modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}>
      {children}
    </div>
  );
});

export default Modal;
