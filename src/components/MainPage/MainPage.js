import React, { useState } from 'react';

import Modal from 'components/UI/Modal/Modal';
import Form from 'components/Form/Form';
import Button from 'components/UI/Button/Button';

import { initialState } from 'context/AddressesContext';

import * as classes from './MainPage.module.css';
import NavBar from 'components/Navigation/NavBar';

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={classes.MainPage}>
      <Modal show={showModal} modalClosed={showModalHandler}>
        <Form
          submitted={showModalHandler}
          address={{ address: initialState.singleAddress }}
          isMainPage
        />
      </Modal>
      <div className={classes.Container}>
        <NavBar isMainPage />
        <h1 className={classes.Title}>address book</h1>
        <Button submitted={showModalHandler} big>
          Add a contact
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
