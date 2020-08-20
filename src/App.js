import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Context, initialAddress, reducer } from './store';

import MainPage from './containers/MainPage/MainPage';
import NavBar from './components/Navigation/NavBar';
import Addresses from './components/Addresses/Addresses';

import './App.css';

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialAddress);
  return (
    <Context.Provider value={{ store, dispatch }}>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Route path="/" exact component={MainPage} />
          <Route path="/addresses" exact component={Addresses} />
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
};

export default App;
