import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AddressCard from './AddressCard/AddressCard';
import Spinner from 'components/UI/Spinner/Spinner';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import Modal from 'components/UI/Modal/Modal';
import Form from 'components/Form/Form';

import * as classes from './Addresses.module.css';
import { AddressesContext } from 'context/AddressesContext';

const Addresses = (props) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    fetchedAddresses,
    setFetchedAddresses,
    singleAddress,
    editSingleAddress,
  } = useContext(AddressesContext);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://address-app-8dda8.firebaseio.com/addresses.json')
      .then((res) => {
        let fetchedAddresses = [];
        for (const address in res.data) {
          fetchedAddresses.push({
            id: address,
            address: res.data[address],
          });
        }
        setFetchedAddresses(fetchedAddresses);
        setLoading(false);
      })
      .catch(console.error);
    // eslint-disable-next-line
  }, []);

  const editHandler = (cardId) => {
    setShowModal(true);
    const clickedAddress = fetchedAddresses.find((el) => el.id === cardId);
    editSingleAddress(clickedAddress);
  };

  return (
    <div className={classes.Addresses}>
      <Backdrop show={showModal} clicked={showModalHandler} />
      <Modal show={showModal}>
        <Form
          address={singleAddress}
          submitted={showModalHandler}
          isAddressPage
        />
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        fetchedAddresses.map((item) => (
          <AddressCard
            key={item.id}
            address={item.address}
            clicked={() => editHandler(item.id)}
          />
        ))
      )}
    </div>
  );
};
export default Addresses;
