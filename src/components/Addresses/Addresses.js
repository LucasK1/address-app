import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AddressCard from './AddressCard/AddressCard';
import Spinner from '../UI/Spinner/Spinner';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Form from '../Form/Form';

import * as classes from './Addresses.module.css';
import { singleAddressContext } from '../../store';
import { AddressesContext } from '../../context/addresses-context';

const Addresses = (props) => {
  // const [addressState, setAddressState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { store, dispatch } = useContext(singleAddressContext);
  const addressesContext = useContext(AddressesContext);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://address-app-8dda8.firebaseio.com/addresses.json')
      .then((res) => {
        let fetchedAddresses = [];
        for (const singleAddress in res.data) {
          fetchedAddresses.push({
            id: singleAddress,
            address: res.data[singleAddress],
          });
        }
        // setAddressState([...addressState, ...fetchedAddresses]);
        addressesContext.setFetchedAddresses([...fetchedAddresses]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const editHandler = (cardId) => {
    setShowModal(true);
    const clickedAddress = addressesContext.fetchedAddresses.find(
      (el) => el.id === cardId
    );
    console.log(clickedAddress);
    dispatch({
      type: 'edit',
      payload: { ...clickedAddress },
    });
  };

  // let addressCards = <Spinner />;
  // if (loading !== true) {
  //   addressCards = addressState.map((item) => {
  //     return (
  //       <AddressCard
  //         key={item.id}
  //         address={item.address}
  //         clicked={() => editHandler(item.id)}
  //       />
  //     );
  //   });
  // }

  return (
    <div className={classes.Addresses}>
      <Backdrop show={showModal} clicked={showModalHandler} />
      <Modal show={showModal}>
        <Form address={store} submitted={showModalHandler} isAddressPage />
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        addressesContext.fetchedAddresses.map((item) => (
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
