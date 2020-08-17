import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import MainPage from './containers/MainPage/MainPage';
import NavBar from './components/Navigation/NavBar';
import Addresses from './components/Addresses/Addresses';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route path="/" exact component={MainPage} />
        <Route path="/addresses" exact component={Addresses} />
      </div>
    </BrowserRouter>
  );
}

export default App;
