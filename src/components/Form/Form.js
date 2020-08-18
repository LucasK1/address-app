import React, { useState } from 'react';
import axios from 'axios';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Form.module.css';

const Form = (props) => {
  const [addressForm, setAddressForm] = useState({
    name: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'Name',
        required: true,
      },
      value: '',
    },
    email: {
      elementType: 'input',
      config: {
        type: 'email',
        placeholder: 'Email',
        required: true,
      },
      value: '',
    },
    phone: {
      elementType: 'input',
      config: {
        type: 'number',
        placeholder: 'Tel. number',
        required: true,
      },
      value: '',
    },
    streetAddress: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'Street name and number',
        required: true,
      },
      value: '',
    },
    cityAddress: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'City and postal code',
        required: true,
      },
      value: '',
    },
    additionalInfo: {
      elementType: 'textarea',
      config: {
        style: {
          resize: 'vertical',
        },
        placeholder: 'Additional information',
        required: true,
      },
      value: '',
    },
  });

  const onChangeHandler = (event, formElementId) => {
    const updatedFormElement = {
      ...addressForm[formElementId],
      value: event.target.value,
    };
    console.log(addressForm);

    const updatedAddressForm = {
      ...addressForm,
      [formElementId]: updatedFormElement,
    };

    setAddressForm(updatedAddressForm);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    const formToSend = {};
    for (let formElementId in addressForm) {
      formToSend[formElementId] = addressForm[formElementId].value;
    }
    console.log(formToSend);
    axios
      .post('https://address-app-8dda8.firebaseio.com/addresses.json', formToSend)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  let addressArray = [];
  for (const key in addressForm) {
    addressArray.push({
      id: key,
      attributes: addressForm[key],
    });
  }

  const form = (
    <form onSubmit={submitFormHandler}>
      {addressArray.map((formElement) => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.attributes.elementType}
            elementConfig={formElement.attributes.config}
            value={formElement.attributes.value}
            changed={(event) => onChangeHandler(event, formElement.id)}
          />
        );
      })}
      <Button small>Submit</Button>
    </form>
  );
  return <div>{form}</div>;
};

export default Form;
