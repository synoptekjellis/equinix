import './app.css';

import { geoMercator, geoPath } from 'd3-geo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feature } from 'topojson-client';

import { updateActive } from '../state/actions/map';
import DataReadout from './data-readout';
import datacenterLocations from './datacenter-locations';
import WorldMap from './world-map';

function stateToComponent(state) {
  return {
    map: state.map
  };
}

@connect(stateToComponent)
class App extends Component {
  componentDidMount() {}

  setActive = point => {
    const { dispatch } = this.props;
    dispatch(updateActive(point));
  };

  clearActive = point => {
    const { dispatch } = this.props;
    dispatch(updateActive({}));
  };

  render() {
    const { active } = this.props.map;

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
            active={active}
            setActive={this.setActive}
            clearActive={this.clearActive}
          />
        </div>
        <div className="data-readout-frame">
          <DataReadout
            locations={filteredLocations}
            active={active}
            setActive={this.setActive}
            clearActive={this.clearActive}
          />
        </div>
      </div>
    );
  }
}

export default App;
