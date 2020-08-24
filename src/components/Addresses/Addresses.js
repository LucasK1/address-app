import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import AddressCard from './AddressCard/AddressCard';
import Spinner from '../UI/Spinner/Spinner';
import Backdrop from '../UI/Backdrop/Backdrop';
import Modal from '../UI/Modal/Modal';
import Form from '../Form/Form';

import * as classes from './Addresses.module.css';
import { Context } from '../../store';

const Addresses = (props) => {
  const [addressState, setAddressState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { store, dispatch } = useContext(Context);

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
    // eslint-disable-next-line
  }, []);

  const editHandler = (cardId) => {
    setShowModal(true);
    const clickedAddress = addressState.filter((el) => el.id === cardId);
    const extractedAddress = clickedAddress[0];
    dispatch({
      type: 'edit',
      payload: { ...extractedAddress },
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
        addressState.map((item) => (
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
