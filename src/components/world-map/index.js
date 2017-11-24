import { geoMercator, geoPath } from 'd3-geo';
import _ from 'lodash';
import React, { Component } from 'react';
import { feature } from 'topojson-client';

import cities from '../cities';
import worldJson from './world-110m.json';

class WorldMap extends Component {
  constructor() {
    super();
    this.state = {
      worldData: [],
      hovering: {}
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
    const { active, setActive, clearActive } = this.props;

    const {
      latitude,
      longitude,
      type,
      city_state,
      country,
      region,
      notes,
      name,
      id,
      isAgent
    } = point;

    const latlong = [longitude, latitude];
    const x = this.projection()(latlong)[0];
    const y = this.projection()(latlong)[1];

    let r = isAgent ? 2.5 : 1.25;
    const fill = isAgent ? '#E91E63' : '#E91EC0';
    const isActive = active.name === point.name;

    if (isActive) {
      r = r * 2;
    }

    return (
      <circle
        key={`marker-${id}`}
        cx={x}
        cy={y}
        r={r}
        fill={fill}
        className="marker"
        onMouseEnter={event => {
          //setActive(point);
        }}
        onMouseLeave={event => {
          //clearActive();
        }}
        onClick={event => {
          if (isActive) {
            clearActive();
          } else {
            setActive(point);
          }
        }}
      />
    );
  };

  generateMarkers = () => {
    const { locations } = this.props;
    const allMArkers = _.chain(locations)
      .map(this.pointToMarkerHtml)
      .value();

    return allMArkers;
  };

  worldDataToSvg = (d, i) => {
    const fill = `rgba(38,50,56,${1 / this.state.worldData.length * i})`;
    const path = geoPath().projection(this.projection())(d);
    const stroke = '#222';
    const strokeWidth = 0.5;
    return (
      <path
        key={`country-path-${i}`}
        d={path}
        className="country"
        //control country colors here
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  };

  generateCountries = () => {
    const { worldData } = this.state;

    return _.map(worldData, this.worldDataToSvg);
  };

  render() {
    const { width, height } = this.props;

    return (
      <svg
        width={width}
        height={height}
        viewBox={`
          ${width * 0.071} 
          ${height * 0.1} 
          ${width * 0.5} 
          ${height * 0.41}`}
        className="map-root"
      >
        <g className="countries">{this.generateCountries()}</g>
        <g className="markers">{this.generateMarkers()}</g>
      </svg>
    );
  }
}

export default WorldMap;
