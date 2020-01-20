import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import DeleteDev from './pages/DeleteDev';
import UpdateDev from './pages/UpdateDev';

import './global.css';
import './App.css';

export default function App() {
  return (
    <div id="app">
        <BrowserRouter>
            <Route exact path="/" component={Home} />
            <Route path="/delete/:github_username" component={DeleteDev} />
            <Route path="/update/:github_username" component={UpdateDev} />
        </BrowserRouter>
    </div>
  );
}
