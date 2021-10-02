// Imports React
import React from 'react';
import ReactDOM from 'react-dom';

// Imports React Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Imports TailwindCSS
import './index.css';

// Imports pages
import App from "./pages/App";
import Windspeed from "./pages/Windspeed";
import Temperature from "./pages/Temperature";
import Frost from "./pages/Frost";
import Humidity from "./pages/Humidity";
import Precipitation from './pages/Precipitation';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch> 
        <Route path="/" exact component={ App } />
        <Route path="/windspeed" component={ Windspeed } />
        <Route path="/temperature" component={ Temperature } />
        <Route path="/frost" component={ Frost } />
        <Route path="/humidity" component={ Humidity } />
        <Route path="/precipitation" component={ Precipitation } />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
