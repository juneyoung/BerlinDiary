import React, { Component } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import MainContainer from './components/MainContainer';
// import logo from './logo.svg';
import './App.css';

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <h1 className="App-title">Welcome to React</h1>
</header>
<p className="App-intro">
  To get started, edit <code>src/App.js</code> and save to reload.
</p>
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <BackgroundVideo />
        <MainContainer />
      </div>
    );
  }
}

export default App;
