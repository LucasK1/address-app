import React, { useState, useEffect, useContext, useRef } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';

import { AddressesContext } from '../../context/AddressesContext';
import './Form.module.css';

const Form = (props) => {
  const nameRef = useRef(null); // useRef to focus on the first input when opening the form
  const [addressForm, setAddressForm] = useState({
    name: {
      elementType: 'input',
      config: {
        type: 'text',
        placeholder: 'Name*',
        required: true,
        ref: nameRef,
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
        maxLength: '200',
        rows: '4',
        placeholder: 'Additional information',
        required: true,
      },
      value: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const { singleAddress, setFetchedAddresses } = useContext(AddressesContext);

  // Makes the form blank if it's a new address and fills it if it's an edit
  useEffect(() => {
    if (props.isMainPage) {
      nameRef.current.focus(); // Focus on the first input in the Form
    }

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

    setAddressForm((prevForm) => (prevForm = { ...updatedAddressForm }));
  };

  // Depending from which site the Form has been submitted it either sends a new address to the database or edits an existing one and updates the page
  const submitFormHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    let formToSend = {};
    for (let formElementId in addressForm) {
      formToSend[formElementId] = addressForm[formElementId].value;
    }
    const formToEdit = { ...formToSend };
    formToSend = { ...formToSend, addedOn: new Date() };
    if (props.isMainPage) {
      // Sends new address to Firebase
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
      // Edits data in the database if the form is accessed by an edit button
      axios
        .patch(
          `https://address-app-8dda8.firebaseio.com/addresses/${singleAddress.id}.json`,
          formToEdit
        )
        .then(() => {
          // Fetches modified addresses from the database
          axios
            .get('https://address-app-8dda8.firebaseio.com/addresses.json')
            .then((res) => {
              let addressesFromServer = [];
              for (let address in res.data) {
                addressesFromServer.push({
                  id: address,
                  address: res.data[address],
                });
              } 
              addressesFromServer.sort((a, b) => {
                return dayjs(a.address.addedOn).isBefore(
                  dayjs(b.address.addedOn)
                )
                  ? 1
                  : -1;
              });
              setFetchedAddresses(addressesFromServer);
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

  // Array from which the form is generated
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
