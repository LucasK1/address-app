import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import * as classes from './Modal.module.css';

const Modal = React.memo(({ show, children, modalClosed }) => {
  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          visibility: show ? 'visible' : 'hidden',
        }}>
        {children}
      </div>
    </>
  );
});

export default Modal;
