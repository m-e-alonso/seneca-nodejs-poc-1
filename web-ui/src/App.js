import React, { useState } from 'react';
import './App.css';
import Services from './components/services/services.js';
import { ServiceViewController } from './components/services/serviceViewController.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

function App() {
  
  const [ servicesController ] = useState(() => new ServiceViewController());

  return (
    <Router>
      <div>
        <ul className="main-menu">
          <li>
            <NavLink exact= {true} activeClassName="active" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/services">Services</NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/claims">Claims</NavLink>
          </li>
        </ul>
      </div>

      <Switch>
        <Route path="/services">
          <Services controller={servicesController}/>
        </Route>
        <Route path="/claims">
          <Claims/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}




function Claims() {
  return <h2>Claims</h2>;
}