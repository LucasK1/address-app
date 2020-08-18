import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddressCard from './AddressCard/AddressCard';
import Spinner from '../UI/Spinner/Spinner';

import * as classes from './Addresses.module.css';

const Addresses = React.memo((props) => {
  const [addressState, setAddressState] = useState([]);
  const [loading, setLoading] = useState(false);

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

  let addressCards = <Spinner />;
  if (loading !== true) {
    addressCards = addressState.map((ad) => {
      return <AddressCard key={ad.id} address={ad.address} />;
    });
  }

  return <div className={classes.Addresses}>{addressCards}</div>;
});
export default Addresses;
