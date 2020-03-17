import React from 'react';
import './App.css';
import Discover from './js/Discover'
import Analytics from './js/Analytics'

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Redirect from="/" to="/discover" />

      <div className="App">
        <Switch>
          <Route path="/discover">
            <Discover />
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
        </Switch>

      </div>

    </Router>

  );
}

export default App;
