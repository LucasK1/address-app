import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AddressesContextProvider from 'context/AddressesContext';

import MainPage from 'components/MainPage/MainPage';
import NavBar from 'components/Navigation/NavBar';
import Addresses from 'components/Addresses/Addresses';

import './App.css';

const App = () => {
  return (
    <AddressesContextProvider>
      <Router>
        <div className="App">
          {/* <NavBar /> */}
          <Route path="/" exact component={MainPage} />
          <Route path="/addresses" exact component={Addresses} />
        </div>
      </Router>
    </AddressesContextProvider>
  );
};

export default App;
