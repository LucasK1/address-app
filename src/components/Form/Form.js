import React, { useState } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import * as classes from './Form.module.css';

const Form = (props) => {
  const addressForm = useState({
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
        placeholder: 'Additional information',
      },
      value: '',
    },
  })[0];
  let addressArray = [];
  for (const key in addressForm) {
    addressArray.push({
      id: key,
      attributes: addressForm[key],
    });
  }

  const form = (
    <form>
      {addressArray.map((el) => {
        return (
          <Input
            key={el.id}
            elementType={el.attributes.elementType}
            elementConfig={el.attributes.config}
            value={el.attributes.config.value}
          />
        );
      })}
      <Button small>Submit</Button>
    </form>
  );
  return <div>{form}</div>;
};

export default Form;
