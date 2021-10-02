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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={ App } />
        <Route path="/windspeed" component={ Windspeed } />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
