import React, { useState } from 'react';

import * as classes from './MainPage.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Form from '../../components/Form/Form';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  const addContactHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={classes.MainPage}>
      <Backdrop show={showModal} clicked={addContactHandler} />
      <Modal show={showModal}>
        <Form />
      </Modal>
      <button className={classes.MainPage_btn} onClick={addContactHandler}>
        {showModal ? 'SPIERRRRDALAJ' : 'Add a contact'}
      </button>
    </div>
  );
};

export default MainPage;
