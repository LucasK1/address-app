import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AddressCard from './AddressCard/AddressCard';
import Spinner from '../UI/Spinner/Spinner';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Form from '../Form/Form';

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
        // console.log(fetchedAddresses, 'dup')
        // setAddressState([...addressState, ...fetchedAddresses]);
        setFetchedAddresses(fetchedAddresses);
        setLoading(false);
      })
      .catch(console.error);
    // eslint-disable-next-line
  }, []);

  const editHandler = (cardId) => {
    setShowModal(true);
    const clickedAddress = fetchedAddresses.find((el) => el.id === cardId);
    console.log(clickedAddress);
    editSingleAddress(clickedAddress);
    // dispatch({
    //   type: 'edit',
    //   payload: { ...clickedAddress },
    // });
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
