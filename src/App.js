import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import './App.css';
import MainPage from './containers/MainPage/MainPage';
import NavBar from './components/Navigation/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route path="/" exact component={MainPage} />
        <Route path="/addresses" exact render={() => <h1>Addresses</h1>} />
      </div>
    </BrowserRouter>
  );
}

export default App;
