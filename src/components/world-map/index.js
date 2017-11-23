import { geoMercator, geoPath } from 'd3-geo';
import _ from 'lodash';
import React, { Component } from 'react';
import { feature } from 'topojson-client';

import cities from '../cities';
import datacenterLocations from '../datacenter-locations';
import worldJson from './world-110m.json';

class WorldMap extends Component {
  constructor() {
    super();
    this.state = {
      worldData: []
    };
  }
  projection() {
    return geoMercator()
      .scale(100)
      .translate([800 / 2, 450 / 2]);
  }
  componentDidMount() {
    this.setState({
      worldData: feature(worldJson, worldJson.objects.countries).features
    });
  }

  pointToMarkerHtml = (point, index) => {
    const {
      latitude,
      longitude,
      type,
      city_state,
      country,
      region,
      notes,
      name,
      isAgent
    } = point;

    const latlong = [longitude, latitude];
    const x = this.projection()(latlong)[0];
    const y = this.projection()(latlong)[1];

    const r = isAgent ? 3 : 1;
    const fill = isAgent ? '#E91E63' : '#eee';
    return (
      <circle
        key={`marker-${index}`}
        cx={x}
        cy={y}
        r={r}
        fill={fill}
        className="marker"
        onMouseEnter={event => {
          console.log('hi!');
        }}
      />
    );
  };

  generateMarkers = () => {
    const allMArkers = _.chain(datacenterLocations)
      .map(this.pointToMarkerHtml)
      .value();

    return allMArkers;
  };

  render() {
    const { width, height } = this.props;

    return (
      <svg
        width={width}
        height={height}
        viewBox={`${0} ${width / 128} ${width / 1.6} ${height / 1.7}`}
        className="map-root"
      >
        <g className="countries">
          {this.state.worldData.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(this.projection())(d)}
              className="country"
              //control country colors here
              fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
              stroke="#222"
              strokeWidth={0.5}
            />
          ))}
        </g>
        <g className="markers">{this.generateMarkers()}</g>
      </svg>
    );
  }
}

export default WorldMap;
