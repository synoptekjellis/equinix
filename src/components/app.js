import './app.css';

import { geoMercator, geoPath } from 'd3-geo';
import React, { Component } from 'react';
import { feature } from 'topojson-client';

import WorldMap from './world-map';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="app">
        <div className="world-map">
          <WorldMap width={1280} height={800} />
        </div>
        <div className="data-readout" />
      </div>
    );
  }
}

export default App;
