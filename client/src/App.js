import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ContentArea from './components/ContentArea';

/* eslint-disable react/prefer-stateless-function */
class App extends Component {
  render() {
    return (
      <div>
        <ContentArea />
      </div>
    );
  }
}

export default App;
