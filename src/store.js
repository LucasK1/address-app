import React from 'react';

export const initialAddress = {
  additionalInfo: '',
  streetAddress: '',
  cityAddress: '',
  name: '',
  email: '',
  phone: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'edit':
      console.log(action.payload, 'DUPA');
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const Context = React.createContext();
