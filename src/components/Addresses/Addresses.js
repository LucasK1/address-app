import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AddressCard from './AddressCard/AddressCard';
import Spinner from 'components/UI/Spinner/Spinner';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import Modal from 'components/UI/Modal/Modal';
import Form from 'components/Form/Form';

import * as classes from './Addresses.module.css';
import { AddressesContext } from '../../context/AddressesContext';

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

  const fetchAddresses = () => {
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
  };

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line
  }, []);

  const editHandler = (cardId) => {
    const clickedAddress = fetchedAddresses.find((el) => el.id === cardId);
    editSingleAddress(clickedAddress);
    setShowModal(true);
  };

  const deleteHandler = (e, cardId) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(
        `https://address-app-8dda8.firebaseio.com/addresses/${cardId}.json`
      )
      .then((res) => {
        const remainingAddresses = fetchedAddresses.filter(
          (item) => cardId !== item.id
        );
        setFetchedAddresses(remainingAddresses);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
            onDeleteClick={(e) => deleteHandler(e, item.id)}
          />
        ))
      )}
    </div>
  );
};
export default Addresses;
