import React from 'react';

export const initialAddress = {
  id: '',
  address: {
    additionalInfo: '',
    streetAddress: '',
    cityAddress: '',
    name: '',
    email: '',
    phone: '',
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'edit':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const Context = React.createContext();
