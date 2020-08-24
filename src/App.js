import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { singleAddressContext, initialAddress, reducer } from './store';
import AddressesContextProvider from './context/addresses-context';

import MainPage from './containers/MainPage/MainPage';
import NavBar from './components/Navigation/NavBar';
import Addresses from './components/Addresses/Addresses';

import './App.css';

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialAddress);
  return (
    <AddressesContextProvider>
      <singleAddressContext.Provider value={{ store, dispatch }}>
        <BrowserRouter>
          <div className="App">
            <NavBar />
            <Route path="/" exact component={MainPage} />
            <Route path="/addresses" exact component={Addresses} />
          </div>
        </BrowserRouter>
      </singleAddressContext.Provider>
    </AddressesContextProvider>
  );
};

export default App;
