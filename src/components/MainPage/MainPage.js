import React, { useState } from 'react';

import * as classes from './MainPage.module.css';
import Modal from '../UI/Modal/Modal';
import Form from '../Form/Form';
import Backdrop from '../UI/Backdrop/Backdrop';
import Button from '../UI/Button/Button';
import { initialState } from '../../context/AddressesContext';

const MainPage = (props) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={classes.MainPage}>
      <Backdrop show={showModal} clicked={showModalHandler} />
      <Modal show={showModal}>
        <Form
          submitted={showModalHandler}
          address={{ address: initialState.singleAddress }}
          isMainPage
        />
      </Modal>
      <img src={require('../../assets/logo.png')} alt="Address Book logo" />
      <Button submitted={showModalHandler} big>
        Add a contact
      </Button>
    </div>
  );
};

export default MainPage;
