import './app.css';

import { geoMercator, geoPath } from 'd3-geo';
import React, { Component } from 'react';
import { feature } from 'topojson-client';

import DataReadout from './data-readout';
import datacenterLocations from './datacenter-locations';
import WorldMap from './world-map';

class App extends Component {
  componentDidMount() {}

  render() {
    const filteredLocations = datacenterLocations;
    const height = 600;
    const width = 1280;
    return (
      <div className="app">
        <div
          className="world-map-frame"
          style={{
            height: `${height}px`
          }}
        >
          <WorldMap
            width={width}
            height={height}
            locations={filteredLocations}
          />
        </div>
        <div className="data-readout-frame">
          <DataReadout locations={filteredLocations} />
        </div>
      </div>
    );
  }
}

export default App;
