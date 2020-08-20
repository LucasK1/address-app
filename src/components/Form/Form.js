import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

import './Form.module.css';
import { Context } from '../../store';

const Form = (props) => {


  const { store, dispatch } = useContext(Context);

  const [addressForm, setAddressForm] = useState({
    name: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'Name*',
        required: true,
      },
      value: '',
    },
    email: {
      elementType: 'input',
      config: {
        type: 'email',
        placeholder: 'Email*',
        required: true,
      },
      value: '',
    },
    phone: {
      elementType: 'input',
      config: {
        type: 'number',
        placeholder: 'Tel. number*',
        required: true,
      },
      value: '',
    },
    streetAddress: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'Street name and number*',
        required: true,
      },
      value: '',
    },
    cityAddress: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'City and postal code*',
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let updatedAddressForm = {};
    for (let key in addressForm) {
      updatedAddressForm = {
        ...updatedAddressForm,
        [key]: {
          ...[key],
          config: {
            ...[key].config,
          },
          value: props.address.[key],
        },
      };
    }
    setAddressForm({ ...addressForm, ...updatedAddressForm });
    return () => {
      let clearedAddressForm = {}
      for (let key in addressForm) {
        clearedAddressForm = {
          ...clearedAddressForm,
          [key]: {
            ...[key],
            config: {
              ...[key].config,
            },
            value: '',
          },
        };
      }
      setAddressForm({...addressForm, ...clearedAddressForm})
    }
  }, [props]);

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
    setLoading(true);
    const formToSend = {};
    for (let formElementId in addressForm) {
      formToSend[formElementId] = addressForm[formElementId].value;
    }
    axios
      .post(
        'https://address-app-8dda8.firebaseio.com/addresses.json',
        formToSend
      )
      .then(() => {
        setLoading(false);
        const resetForm = {};
        for (let formElementId in addressForm) {
          resetForm[formElementId] = {
            ...addressForm[formElementId],
            value: '',
          };
        }
        setAddressForm({ ...addressForm, ...resetForm });
        props.submitted();
      })
      .catch((err) => console.log(err));
  };

  let addressArray = [];
  for (const key in addressForm) {
    addressArray.push({
      id: key,
      attributes: addressForm[key],
    });
  }
  let form = <Spinner />;
  if (loading !== true) {
    form = (
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
  }
  return <div>{form}</div>;
};

export default Form;
