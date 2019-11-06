import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import List from './Components/List';
import Add from './Components/Add';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={List} />
        <Route exact path='/Add' component={Add} />
      </BrowserRouter>
    </div>
  );
}

export default App;
