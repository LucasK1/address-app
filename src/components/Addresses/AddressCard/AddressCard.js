import React from 'react';

import * as classes from './AddressCard.module.css';

const AddressCard = (props) => {
  const {
    name,
    email,
    phone,
    streetAddress,
    cityAddress,
    additionalInfo,
  } = props.address;

  return (
    <div className={classes.AddressCard}>
      <ul>
        <li>
          <span>Name:</span>
          <p>{name}</p>
        </li>
        <li>
          <span>Email:</span>
          <p><a href={`mailto:${email}`}>{email}</a></p>
        </li>
        <li>
          <span>Phone number:</span>
          <p>{phone}</p>
        </li>
        <li>
          <span>Address:</span>
          <p>{streetAddress}</p>
          <p>{cityAddress}</p>
        </li>
        <li>
          <span>Info:</span>
          <p>{additionalInfo}</p>
        </li>
      </ul>
    </div>
  );
};

export default AddressCard;
