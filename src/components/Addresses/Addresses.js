import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddressCard from './AddressCard/AddressCard';
import Spinner from '../UI/Spinner/Spinner';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Form from '../Form/Form';
import Aux from '../../hoc/Auxiliary';

import * as classes from './Addresses.module.css';

const Addresses = (props) => {
  const [addressState, setAddressState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [addressEdit, setAddressEdit] = useState({
    additionalInfo: '',
    cityAddress: '',
    name: '',
    email: '',
    phone: '',
    streetAddress: '',
  });

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://address-app-8dda8.firebaseio.com/addresses.json')
      .then((res) => {
        let fetchedAddresses = [];
        for (let singleAddress in res.data) {
          fetchedAddresses.push({
            id: singleAddress,
            address: res.data[singleAddress],
          });
        }
        setAddressState([...addressState, ...fetchedAddresses]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const editHandler = (cardId) => {
    setShowModal(true);
    console.log(addressState);
    const clickedAddress = addressState.filter((el) => el.id === cardId);
    const extractedAddress = clickedAddress[0].address;
    console.log(extractedAddress, ' CLICKED');
    setAddressEdit({
      ...addressEdit,
      ...extractedAddress,
    });
    setTimeout(() => {
      console.log(addressEdit, ' ADDRESS EDIT');
    }, 2000);
  };

  let addressCards = <Spinner />;
  if (loading !== true) {
    addressCards = addressState.map((ad) => {
      return (
        <AddressCard
          key={ad.id}
          address={ad.address}
          clicked={() => editHandler(ad.id)}
        />
      );
    });
  }

  return (
    <div className={classes.Addresses}>
      <Backdrop show={showModal} clicked={showModalHandler} />
      <Modal show={showModal}>
        <Form address={addressEdit} submitted={showModalHandler} />
      </Modal>
      {addressCards}
    </div>
  );
};
export default Addresses;
