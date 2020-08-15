import React, { useState, useEffect } from 'react';
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
      },
      value: '',
    },
    email: {
      elementType: 'input',
      config: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
    },
    phone: {
      elementType: 'input',
      config: {
        type: 'number',
        placeholder: 'Tel. number',
      },
      value: '',
    },
    streetAddress: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'Street name and number',
      },
      value: '',
    },
    cityAddress: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'City and postal code',
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
      },
      value: '',
    },
  });

  const onChangeHandler = (event, formElementId) => {
    const updatedFormElement = {...addressForm[formElementId], value: event.target.value};
    console.log(addressForm);

    const updatedAddressForm = {...addressForm, [formElementId]: updatedFormElement};

    setAddressForm(updatedAddressForm);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

  };

  let addressArray = [];
  for (const key in addressForm) {
    addressArray.push({
      id: key,
      attributes: addressForm[key],
    });
  }

  const form = (
    <form>
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
      <Button small submitted={submitFormHandler}>
        Submit
      </Button>
    </form>
  );
  return <div>{form}</div>;
};

export default Form;
