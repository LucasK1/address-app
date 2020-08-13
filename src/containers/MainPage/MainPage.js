import React, { useState } from 'react';

import * as classes from './MainPage.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Form from '../../components/Form/Form';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  const addContactHandler = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <div className={classes.MainPage}>
      <Backdrop show={showModal} clicked={addContactHandler} />
      <Modal show={showModal} className={classes.MainPage_Modal}>
        <Form />
      </Modal>
      <img src={require('../../assets/logo.png')} alt="Address Book logo" />
      <Button submitted={addContactHandler} big>Add a contact</Button>
    </div>
  );
};

export default MainPage;
