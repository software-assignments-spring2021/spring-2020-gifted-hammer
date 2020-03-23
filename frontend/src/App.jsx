import React, { useState } from 'react';
import './App.css';
import Discover from './js/Discover.jsx'
import Analytics from './js/Analytics.jsx'
import AppHeader from './js/AppHeader.jsx'
import AppFooter from './js/AppFooter.jsx'

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [pageTitle, setPageTitle] = useState('DISCOVER');

  return (
    <Router>
      <Redirect from="/" to="/discover" />
      <div className="App">
        <Switch>
          <Route path="/discover">
            <AppHeader key='header' pageTitle='DISCOVER' />
            <Discover />
          </Route>
          <Route path="/analytics">
            <AppHeader key='header' pageTitle='ANALYTICS' />
            <Analytics />
          </Route>
        </Switch>
        <AppFooter />
      </div>

    </Router>

  );
}

export default App;
