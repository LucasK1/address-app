import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';

import { AddressesContext } from '../../context/AddressesContext';
import './Form.module.css';

const Form = (props) => {
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
  const { singleAddress, setFetchedAddresses } = useContext(AddressesContext);

  useEffect(() => {
    console.log(props, 'props');
    let updatedAddressForm = {};
    for (let key in addressForm) {
      updatedAddressForm = {
        ...updatedAddressForm,
        [key]: {
          ...addressForm[key],
          value: props.address.address[key],
        },
      };
    }
    setAddressForm({ ...addressForm, ...updatedAddressForm });

    return () => {
      let clearedAddressForm = {};
      for (let key in addressForm) {
        clearedAddressForm = {
          ...clearedAddressForm,
          [key]: {
            ...addressForm[key],
            value: '',
          },
        };
      }
      setAddressForm({ ...addressForm, ...clearedAddressForm });
    };
    // eslint-disable-next-line
  }, [props]);

  const onChangeHandler = (event, formElementId) => {
    const updatedFormElement = {
      ...addressForm[formElementId],
      value: event.target.value,
    };

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
    if (props.isMainPage) {
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
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (props.isAddressPage) {
      axios
        .patch(
          `https://address-app-8dda8.firebaseio.com/addresses/${singleAddress.id}.json`,
          formToSend
        )
        .then(() => {
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
              setFetchedAddresses(fetchedAddresses);
              setLoading(false);
            })
            .catch(console.error);
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
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const addressArray = Object.keys(addressForm).map((key) => ({
    id: key,
    attributes: addressForm[key],
  }));

  return loading ? (
    <Spinner />
  ) : (
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
};

export default Form;
