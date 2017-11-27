import './fade.css';

import { geoMercator, geoPath } from 'd3-geo';
import _ from 'lodash';
import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { feature } from 'topojson-client';

import worldJson from './world-110m.json';

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    timeout={{
      enter: 2000,
      exit: 3000
    }}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

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
    const { hovering } = this.state;

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

    const isActive = active.id === point.id;
    const isHovering = hovering.id === point.id;

    let r = isAgent ? 2.5 : 1.25;
    const basicFill = isAgent ? '#E91E63' : '#993d5c';
    const activeFill = isAgent ? '#f0ff16' : '#ccbd14';
    const fill = isActive ? activeFill : basicFill;

    if (isHovering) {
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
          this.setState({
            hovering: point
          });
        }}
        onMouseLeave={event => {
          this.setState({
            hovering: {}
          });
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

  generateAgentMarkers = () => {
    const { locations } = this.props;
    const allMArkers = _.chain(locations)
      .map(this.pointToMarkerHtml)
      .value();

    return allMArkers;
  };

  generateTestMarkers = () => {
    function testsByExistingMarkers(m) {
      return !m.isAgent;
    }

    const { active } = this.props;
    const testMarkers = _.chain(active.tests)
      .filter(testsByExistingMarkers)
      .map(this.pointToMarkerHtml)
      .value();

    return testMarkers;
  };

  generateTestLines = () => {
    const { active } = this.props;

    return _.map(active.tests, test => {
      const latlong1 = [test.longitude, test.latitude];
      const x1 = this.projection()(latlong1)[0];
      const y1 = this.projection()(latlong1)[1];

      const latlong2 = [active.longitude, active.latitude];
      const x2 = this.projection()(latlong2)[0];
      const y2 = this.projection()(latlong2)[1];

      const strokeWidth = 1;
      const fill = '#993d5c';
      return (
        <line
          key={`line-${test.id}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          strokeWidth={strokeWidth}
          stroke={fill}
        />
      );
    });
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
        <g className="test-lines">{this.generateTestLines()}</g>
        <g className="test-markers">{this.generateTestMarkers()}</g>
        <g className="agent-markers">{this.generateAgentMarkers()}</g>
      </svg>
    );
  }
}

export default WorldMap;
