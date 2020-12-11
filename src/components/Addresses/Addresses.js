import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { AddressesContext } from '../../context/AddressesContext';

import AddressCard from './AddressCard/AddressCard';
import Spinner from 'components/UI/Spinner/Spinner';
import Modal from 'components/UI/Modal/Modal';
import Form from 'components/Form/Form';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import NavBar from 'components/Navigation/NavBar';

import * as classes from './Addresses.module.css';

const Addresses = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const {
    fetchedAddresses,
    setFetchedAddresses,
    singleAddress,
    editSingleAddress,
    searchedAddresses,
    setSearchedAddresses,
  } = useContext(AddressesContext);

  useEffect(() => {
    // Fetch addresses at the page load
    setLoading(true);
    axios
      .get('https://address-app-8dda8.firebaseio.com/addresses.json')
      .then((res) => {
        let addressesFromServer = [];
        for (const address in res.data) {
          addressesFromServer.push({
            id: address,
            address: res.data[address],
          });
        }
        addressesFromServer.sort((a, b) => {
          return dayjs(a.address.addedOn).isBefore(dayjs(b.address.addedOn))
            ? 1
            : -1;
        });
        setFetchedAddresses(addressesFromServer);
        setLoading(false);
      })
      .catch(console.error);
    // eslint-disable-next-line
  }, []);

  const showModalHandler = () => {
    setShowModal(!showModal);
  };

  // Opens a modal with a form to edit an address when an address card is clicked
  const editHandler = (cardId) => {
    const clickedAddress = fetchedAddresses.find((el) => el.id === cardId);
    editSingleAddress(clickedAddress);
    setShowModal(true);
  };

  // Deletes an address from the database when delete button is clicked
  const deleteHandler = (e, cardId) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(
        `https://address-app-8dda8.firebaseio.com/addresses/${cardId}.json`
      )
      .then((res) => {
        const remainingAddresses = fetchedAddresses.filter(
          (item) => cardId !== item.id
        );
        setFetchedAddresses(remainingAddresses);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Search bar change handler
  const onChangeSearchHandler = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  // Sort Buttons Handler, works either on all addresses or on searched addresses
  const sortHandler = (e, keyword) => {
    e.preventDefault();
    setLoading(true);
    const sorted =
      searchedAddresses.length > 0
        ? [...searchedAddresses]
        : [...fetchedAddresses];
    switch (keyword) {
      case 'byAlpha':
        sorted.sort((a, b) => {
          const x = a.address.name.toLowerCase();
          const y = b.address.name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
        break;
      case 'byNewest':
        sorted.sort((a, b) => {
          return dayjs(a.address.addedOn).isBefore(dayjs(b.address.addedOn))
            ? 1
            : -1;
        });
        break;
      case 'byOldest':
        sorted.sort((a, b) => {
          return dayjs(a.address.addedOn).isAfter(dayjs(b.address.addedOn))
            ? 1
            : -1;
        });
        break;
      default:
        return sorted;
    }
    searchedAddresses.length > 0
      ? setSearchedAddresses(sorted)
      : setFetchedAddresses(sorted);
    setLoading(false);
  };

  // Search bar handler
  const filteredAddresses =
    fetchedAddresses.length !== 0
      ? fetchedAddresses.filter((address) => {
          for (let key in address.address) {
            if (
              address.address[key]
                .toLowerCase()
                .includes(searchWord.toLowerCase())
            ) {
              return true;
            }
          }

          return false;
        })
      : [];

  return (
    <>
      <NavBar />
      <div className={classes.SearchSort}>
        <div>
          <Button submitted={(e) => sortHandler(e, 'byAlpha')} medium>
            Sort Alphabetically
          </Button>
          <Button submitted={(e) => sortHandler(e, 'byNewest')} medium>
            Sort Newest-Oldest
          </Button>
          <Button submitted={(e) => sortHandler(e, 'byOldest')} medium>
            Sort Oldest-Newest
          </Button>
        </div>
        <div className={classes.SearchArea}>
          <Input
            elementConfig={{ type: 'text', placeholder: 'Search' }}
            changed={onChangeSearchHandler}
            value={searchWord}
            isSearchBar
          />
        </div>
      </div>
      <div className={classes.Addresses}>
        <Modal show={showModal} modalClosed={showModalHandler}>
          <Form
            address={singleAddress}
            submitted={showModalHandler}
            isAddressPage
          />
        </Modal>
        {loading ? (
          <Spinner />
        ) : (
          <div className={classes.Addresses__container}>
            {filteredAddresses.length !== 0
              ? filteredAddresses.map((item) => (
                  <AddressCard
                    key={item.id}
                    address={item.address}
                    clicked={() => editHandler(item.id)}
                    onDeleteClick={(e) => deleteHandler(e, item.id)}
                  />
                ))
              : fetchedAddresses.map((item) => (
                  <AddressCard
                    key={item.id}
                    address={item.address}
                    clicked={() => editHandler(item.id)}
                    onDeleteClick={(e) => deleteHandler(e, item.id)}
                  />
                ))}
          </div>
        )}
      </div>
    </>
  );
};
export default Addresses;
