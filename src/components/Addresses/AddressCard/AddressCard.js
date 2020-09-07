import React from 'react';
import moment from 'moment';

import * as classes from './AddressCard.module.css';
// import Button from 'components/UI/Button/Button';

const AddressCard = ({
  address: {
    name,
    email,
    phone,
    streetAddress,
    cityAddress,
    additionalInfo,
    addedOn,
  },
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
        <li>
          <span>Added On:</span>
          <p>
            {addedOn && typeof addedOn === 'string'
              ? moment(addedOn).format('DD/MM/YYYY hh:mm')
              : 'Unknown'}
          </p>
        </li>
      </ul>
      {/* <div className={classes.AddressCard_btn}>
        <Button small>Delete</Button>
      </div> */}
    </div>
  );
};

export default AddressCard;
