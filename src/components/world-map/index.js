import './fade.css';

import * as d3 from 'd3';
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
  constructor(props) {
    super();
    this.state = {
      worldData: [],
      hovering: {},
      zooming: false,
      zoomedTo: 'map',
      zoomTransform: `translate(5.4026494179858275,1.0799531147702623) scale(1)`
    };

    this.zoom = d3
      .zoom()
      .on('zoom', this.zoomed)
      .on('start', this.zoomStart)
      .on('end', this.zoomEnd);
  }
  projection() {
    return d3
      .geoMercator()
      .scale(100)
      .translate([800 / 2, 450 / 2]);
  }

  zoomed = () => {
    //console.log('ZOOMED', d3.event);

    this.setState({
      zoomTransform: d3.event.transform
    });
  };

  zoomEnd = () => {
    console.log('____________', this.props.active);

    this.setState({
      zooming: false,
      zoomedTo: this.props.active.id || 'map'
    });
  };

  zoomStart = () => {
    this.setState({
      zooming: true,
      zoomedTo: null
    });
  };

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

      const strokeWidth = 0.5;
      const fill = '#E91E63';
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
    const path = d3.geoPath().projection(this.projection())(d);
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

  componentDidMount() {
    this.setState({
      worldData: feature(worldJson, worldJson.objects.countries).features
    });

    d3.select(this.refs.svg).call(this.zoom);
  }

  doZoom = () => {
    const { active } = this.props;

    if (this.state.zooming) {
      //console.log('zooming');
      return;
    }

    if (!active.id && this.state.zoomedTo === 'map') {
      return;
    }

    const needToZoomIn = active.id && this.state.zoomedTo != active.id;
    const needToZoomOut = !active.id && this.state.zoomedTo != 'map';

    const speed = 750;

    if (needToZoomIn) {
      const latlong1 = [active.longitude, active.latitude];
      const x1 = this.projection()(latlong1)[0];
      const y1 = this.projection()(latlong1)[1];

      console.log(x1, y1, [active.longitude, active.latitude]);

      let bbox = this.refs.svg.getBoundingClientRect();

      var x = d3
        .scaleLinear()
        .domain([180, -180])
        .range([-this.props.width * 0.75, this.props.width * 0.75]);

      var y = d3
        .scaleLinear()
        .domain([90, -90])
        .range([this.props.height * 0.5, -this.props.height * 0.5]);

      console.log(bbox);

      console.log('->', x(active.longitude), '|', y(active.latitude));

      d3
        .select(this.refs.svg)
        .transition()
        .duration(speed)
        .call(
          this.zoom.transform,
          d3.zoomIdentity
            .translate(x(active.longitude), y(active.latitude))
            .scale(1.5)
        );
    }

    if (needToZoomOut) {
      d3
        .select(this.refs.svg)
        .transition()
        .duration(speed)
        .call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
    }
  };

  componentDidUpdate() {
    const { active } = this.props;
    //console.log('updating', this.state.zooming);
    this.doZoom();
  }

  render() {
    const { width, height } = this.props;
    const { zoomTransform, zoomScale } = this.state;

    return (
      <svg
        ref="svg"
        width={width}
        height={height}
        viewBox={`
          ${width * 0.0725} 
          ${height * 0.2} 
          ${width * 0.475} 
          ${height * 0.2}`}
        className="map-root"
        transform={`${zoomTransform}`}
      >
        <g className="countries">{this.generateCountries()}</g>
        <g className="test-lines">{this.generateTestLines()}</g>
        <g ref="tests" className="test-markers">
          {this.generateTestMarkers()}
        </g>
        <g className="agent-markers">{this.generateAgentMarkers()}</g>
      </svg>
    );
  }
}

export default WorldMap;
