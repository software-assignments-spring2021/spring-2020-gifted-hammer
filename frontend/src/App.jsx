import React, {useState, useEffect} from 'react';
import './App.css';
import Discover from './js/Discover.jsx'
import Analytics from './js/Analytics.jsx'
import AppHeader from './js/AppHeader.jsx'
import AppFooter from './js/AppFooter.jsx'
import hash from './hash'

import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  const [token, setToken] = useState(null);
  const  [accessToken, setAccessToken] = useState(null);

  useEffect(() => {

    fetch('/token')
    .then(response => response.json())
    .then(data => setToken(data.token));
  }, []);   

  useEffect(() => {
    let accessToken = hash.access_token;
    if (accessToken) {
      setAccessToken(accessToken);
      console.log(accessToken);  
    }      
  }, [accessToken]);   
  

  return (
    <Router>
      <Redirect from="/" to="/discover" />
      <div className="App">
        <Switch>
          <Route path="/discover">
            <AppHeader key='header' pageTitle='DISCOVER' />
            <Discover token={token}/>
          </Route>
          <Route path="/analytics">
            <AppHeader key='header' pageTitle='ANALYTICS' />
            <Analytics token = {token} accessToken = {accessToken}/>
          </Route>
        </Switch>
        <AppFooter />
      </div>
    </Router>

  );
}

export default App;
