import React, { Component } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import MainContainer from './components/MainContainer';
import StaticFooter from './components/StaticFooter'
import './App.css';
import apiKeys from './assets/secrets/keys.json';

class App extends Component {

  constructor () {
    super();
    this.state = {
      apiKeys : apiKeys
    }
  }

  render() {
    return (
      <div className="App">
        <BackgroundVideo />
        <MainContainer apiKeys={ this.state.apiKeys } />
        <StaticFooter />
      </div>
    );
  }
}

export default App;
