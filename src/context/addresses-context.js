import React, { useState } from 'react';

export const AddressesContext = React.createContext({
  fetchedAddresses: [],
  setFetchedAddresses: () => {},
});

const AddressesContextProvider = (props) => {
  const [addresses, setAddresses] = useState([]);

  const setFetchedAddressesHandler = (fetchedAddresses) => {
    setAddresses(fetchedAddresses);
  };

  return (
    <AddressesContext.Provider
      value={{
        fetchedAddresses: addresses,
        setFetchedAddresses: (fetchedAddresses) =>
          setFetchedAddressesHandler(fetchedAddresses),
      }}
    >
      {props.children}
    </AddressesContext.Provider>
  );
};

export default AddressesContextProvider;
