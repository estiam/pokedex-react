import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import List from './Components/List';
import Add from './Components/Add';
import Delete from './Components/Delete';
import View from './Components/View';
import Edit from './Components/Edit';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path='/' component={List} />
        <Route exact path='/Add' component={Add} />
        <Route exact path='/View/:pokemonId' component={View} />
        <Route exact path='/Edit/:pokemonId' component={Edit} />
        <Route exact path='/Delete/:pokemonId' component={Delete} />
      </BrowserRouter>
    </div>
  );
}

export default App;
