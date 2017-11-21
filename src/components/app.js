import './app.css';

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="world-map" />
        <div className="data-readout" />
      </div>
    );
  }
}

export default App;
