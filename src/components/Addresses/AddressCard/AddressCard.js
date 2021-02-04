import React from 'react';
import moment from 'moment';

import * as classes from './AddressCard.module.css';
import Button from 'components/UI/Button/Button';
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
  onDeleteClick,
}) => {
  return (
    <div className={classes.AddressCard}>
      {/* <ul>
        <li>
          <b>Name:</b>
          <p>{name}</p>
        </li>
        <li>
          <b>Email:</b>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </li>
        <li>
          <b>Phone number:</b>
          <p>{phone}</p>
        </li>
        <li>
          <b>Address:</b>
          <address>
            <p>{streetAddress}</p>
            <p>{cityAddress}</p>
          </address>
        </li>
        <li>
          <b>Added On:</b>
          <p>
            {addedOn && typeof addedOn === 'string'
              ? moment(addedOn).format('DD/MM/YYYY hh:mm')
              : 'Unknown'}
          </p>
        </li>
        <li>
          <b>Info:</b>
          <p>{additionalInfo}</p>
        </li>
      </ul> */}
      <dl>
        <dt>Name:</dt>
        <dd>{name}</dd>

        <dt>Email:</dt>
        <dd>
          <a href={`mailto:${email}`}>{email}</a>
        </dd>

        <dt>Phone number:</dt>
        <dd>{phone}</dd>

        <dt>Address:</dt>
        <dd>
          <address>
            <p>{streetAddress}</p>
            <p>{cityAddress}</p>
          </address>
        </dd>

        <dt>Added On:</dt>
        <dd>
          {addedOn && typeof addedOn === 'string'
            ? moment(addedOn).format('DD/MM/YYYY hh:mm')
            : 'Unknown'}
        </dd>

        <dt>Info:</dt>
        <dd>{additionalInfo}</dd>
      </dl>
      <div className={classes.AddressCard_btns}>
        <Button small submitted={clicked}>
          Edit
        </Button>
        <Button small red submitted={onDeleteClick}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
