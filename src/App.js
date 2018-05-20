import React, { Component } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import MainContainer from './components/MainContainer';
import StaticFooter from './components/StaticFooter'
import './App.css';
import apiKeys from './assets/secrets/keys.json';
import ElasticsearchClient from './assets/scripts/ElasticsearchClient';

class App extends Component {

  constructor () {
    super();
    this.state = {
      apiKeys : apiKeys
    }
  }

  componentDidMount = () => {
    ElasticsearchClient.ping({
      requestTimeout : 1000 
    }, function (err) {
      if(err) {
        console.trace('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    })
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
