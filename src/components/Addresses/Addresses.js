import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as classes from './Addresses.module.css';
import AddressCard from './AddressCard/AddressCard';

const Addresses = React.memo((props) => {
  const [addressState, setAddressState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://address-app-8dda8.firebaseio.com/addresses.json')
      .then((res) => {
        console.log(res.data);
        let fetchedAddresses = [];
        for (let singleAddress in res.data) {
          fetchedAddresses.push({
            id: singleAddress,
            address: res.data[singleAddress],
          });
          console.log(fetchedAddresses);
        }
        setAddressState([...addressState, ...fetchedAddresses]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  let addressCards = <h1>Loading</h1>;
  if (loading !== true) {
    addressCards = addressState.map((ad) => {
      return <AddressCard key={ad.id} address={ad.address} />;
    });
  }

  return <div className={classes.Addresses}>{addressCards}</div>;
});
export default Addresses;
