import React, { useReducer, createContext } from 'react';
import AddressesReducer from './AddressesReducer';

export const initialState = {
  fetchedAddresses: [],
  searchedAddresses: [],
  singleAddress: {
    id: '',
    address: {
      additionalInfo: '',
      streetAddress: '',
      cityAddress: '',
      name: '',
      email: '',
      phone: '',
    },
  },
};

export const AddressesContext = createContext(initialState);

const AddressesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AddressesReducer, initialState);

  // Addresses fetched from Firebase
  const setFetchedAddresses = (fetchedAddresses) => {
    dispatch({ type: 'SET_FETCHED_ADDRESSES', payload: fetchedAddresses });
  };

  // State containing a single address which is to be edited
  const editSingleAddress = (editedAddress) => {
    dispatch({ type: 'EDIT_SINGLE_ADDRESS', payload: editedAddress });
  };

  const setSearchedAddresses = (searchedAddresses) => {
    dispatch({ type: 'SET_SEARCHED_ADDRESSES', payload: searchedAddresses });
  };

  return (
    <AddressesContext.Provider
      value={{
        fetchedAddresses: state.fetchedAddresses,
        singleAddress: state.singleAddress,
        searchedAddresses: state.searchedAddresses,
        setFetchedAddresses,
        editSingleAddress,
        setSearchedAddresses,
      }}>
      {children}
    </AddressesContext.Provider>
  );
};

export default AddressesContextProvider;
