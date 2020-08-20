import React, { useState, useContext } from 'react';

import * as classes from './MainPage.module.css';
import Modal from '../../components/UI/Modal/Modal';
import Form from '../../components/Form/Form';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';
import { Context } from '../../store';

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { store } = useContext(Context);
  
  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={classes.MainPage}>
      <Backdrop show={showModal} clicked={showModalHandler} />
      <Modal show={showModal}>
        <Form submitted={showModalHandler} address={{}} />
      </Modal>
      <img src={require('../../assets/logo.png')} alt="Address Book logo" />
      <Button submitted={showModalHandler} big>
        Add a contact
      </Button>
    </div>
  );
};

export default MainPage;
