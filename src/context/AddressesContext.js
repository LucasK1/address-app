import React, { useReducer, createContext } from 'react';
import AddressesReducer from './AddressesReducer';

export const initialState = {
  fetchedAddresses: [],
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

  // State containing an address which is to be edited
  const editSingleAddress = (info) => {
    dispatch({ type: 'EDIT_SINGLE_ADDRESS', payload: info });
  };

  return (
    <AddressesContext.Provider
      value={{
        fetchedAddresses: state.fetchedAddresses,
        singleAddress: state.singleAddress,
        setFetchedAddresses,
        editSingleAddress,
      }}>
      {children}
    </AddressesContext.Provider>
  );
};

export default AddressesContextProvider;
