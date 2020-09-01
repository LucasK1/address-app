import React, { useState } from 'react';

import Modal from 'components/UI/Modal/Modal';
import Form from 'components/Form/Form';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import Button from 'components/UI/Button/Button';

import { initialState } from 'context/AddressesContext';

import * as classes from './MainPage.module.css';

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
