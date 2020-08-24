import React from 'react';

import * as classes from './AddressCard.module.css';

const AddressCard = ({
  address: { name, email, phone, streetAddress, cityAddress, additionalInfo },
  clicked,
}) => {
  return (
    <div className={classes.AddressCard} onClick={clicked}>
      <ul>
        <li>
          <span>Name:</span>
          <p>{name}</p>
        </li>
        <li>
          <span>Email:</span>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </li>
        <li>
          <span>Phone number:</span>
          <p>{phone}</p>
        </li>
        <li>
          <span>Address:</span>
          <address>
            <p>{streetAddress}</p>
            <p>{cityAddress}</p>
          </address>
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
