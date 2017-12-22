import './index.css';

import * as d3 from 'd3';
import _ from 'lodash';
import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';
import { feature } from 'topojson-client';

import worldJson from './world-110m.json';

const {
  countryStrokeWidth,
  zoomTransitionSpeed,
  maxZoomLevel,
  lineStrokeWidth,
  lineStrokeWidthActive,
  agentMarkerRadius,
  testMarkerRadius,
  blacklist
} = global.config;

const COUNTRY_STROKE_WIDTH = countryStrokeWidth || 0.25;
const ZOOM_TRANSITION_SPEED = zoomTransitionSpeed || 750;
const MAX_ZOOM_LEVEL = maxZoomLevel || 25;
const LINE_STROKE_WIDTH = lineStrokeWidth || 0.25;
const LINE_STROKE_WIDTH_ACTIVE = lineStrokeWidthActive || 1.75;
const AGENT_MARKER_RADIUS = agentMarkerRadius || 3.5;
const TEST_MARKER_RADIUS = testMarkerRadius || 2;
const TEST_BLACKLIST = blacklist || [];

class WorldMap extends Component {
  constructor(props) {
    super();
    this.state = {
      worldData: [],
      hovering: {},
      hoverAt: null,
      zooming: false,
      zoomedTo: 'map',
      currentScale: 1,
      zoomTransform: `translate(0,0) scale(1)`
    };

    this.zoom = d3
      .zoom()
      .scaleExtent([0.9, 6.1])
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
    this.setState({
      zoomTransform: d3.event.transform
    });
    this.currentScale = d3.event.transform.k;
  };

  zoomEnd = () => {
    const { activeTest, active } = this.props;
    this.setState({
      zooming: false,
      zoomedTo: activeTest.id || active.id || 'map'
    });

    this.zooming = false;
  };

  zoomStart = () => {
    this.setState({
      zooming: true,
      zoomedTo: null
    });
  };

  pointToMarkerHtml = (point, index) => {
    const {
      active,
      activeTest,
      setActive,
      setActiveTest,
      clearActive,
      clearActiveTest
    } = this.props;
    const { hovering } = this.state;

    const {
      latitude,
      longitude,
      type,
      // city_state,
      // country,
      // region,
      // notes,
      name,
      id,
      isAgent
    } = point;

    if (TEST_BLACKLIST.indexOf(type) > -1) {
      //console.log(type);
      return;
    }

    const latlong = [longitude, latitude];
    const x = this.projection()(latlong)[0];
    const y = this.projection()(latlong)[1];

    const isActive = active.id === point.id;
    const isActiveTest = activeTest.id === point.id;
    const isHovering = hovering.id === point.id;

    let r = isAgent ? AGENT_MARKER_RADIUS : TEST_MARKER_RADIUS;
    const basicFill = isAgent ? '#f44336' : '#D32f2f';
    const activeFill = isAgent ? '#ff0000' : '#D32f2f';
    const fill = isActive ? activeFill : basicFill;

    if (isHovering) {
      r = r * 1.5;
    }

    r = r / (this.state.zoomTransform.k || 1);

    let opacity = active.id && isAgent ? 0.4 : 0.9;
    if (active && isActive) {
      opacity = 1;
    }

    let activeRef = isActive ? 'active' : '';

    return (
      <circle
        key={`marker-${id}`}
        cx={x}
        cy={y}
        r={r}
        fill={fill}
        ref={activeRef}
        opacity={opacity}
        title={name}
        className="marker"
        onMouseEnter={event => {
          this.setState({
            hovering: point,
            hoverAt: {
              pageX: event.pageX,
              pageY: event.pageY
            }
          });
        }}
        onMouseLeave={event => {
          this.setState({
            hovering: {},
            hoverAt: null
          });
        }}
        onClick={event => {
          if (isAgent) {
            if (isActive) {
              clearActive();
            } else {
              setActive(point);
            }
          } else {
            if (isActiveTest) {
              clearActiveTest();
            } else {
              setActiveTest(point);
            }
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
    const { active, activeTest } = this.props;

    return _.map(active.tests, test => {

      const latlong1 = [test.longitude, test.latitude];
      const x1 = this.projection()(latlong1)[0];
      const y1 = this.projection()(latlong1)[1];

      const latlong2 = [active.longitude, active.latitude];
      const x2 = this.projection()(latlong2)[0];
      const y2 = this.projection()(latlong2)[1];

      let strokeWidth = LINE_STROKE_WIDTH;
      const fill = '#D32f2f';

      let opacity = 0.9;
      let ref = '';
      if (activeTest.id) {
        opacity = 0.2;
      }

      if (activeTest && activeTest.id === test.id) {
        opacity = 1;
        strokeWidth = LINE_STROKE_WIDTH_ACTIVE;
        ref = 'activetest';
      }

      strokeWidth = strokeWidth / (this.state.zoomTransform.k || 1);

      return (
        <line
          key={`line-${test.id}`}
          ref={ref}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          opacity={opacity}
          strokeWidth={strokeWidth}
          stroke={fill}
        />
      );
    });
  };

  worldDataToSvg = (d, i) => {
    const fill = `rgba(60,70,70,${0.7 / this.state.worldData.length * i})`;
    const path = d3.geoPath().projection(this.projection())(d);
    const stroke = '#111';
    const strokeWidth =
      COUNTRY_STROKE_WIDTH / (this.state.zoomTransform.k || 1);

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

  currentScale = 1;
  zooming = false;
  doZoom = () => {
    const { active, activeTest } = this.props;
    const { zoomedTo } = this.state;
    const maxZoom = MAX_ZOOM_LEVEL;

    if (this.zooming) {
      return;
    }

    if (this.state.zooming) {
      return;
    }

    const needToZoomToLines =
      !activeTest.id && active.id && zoomedTo !== active.id;
    const needToZoomToLine = activeTest.id && zoomedTo !== activeTest.id;
    const needToZoomToMap = !active.id && zoomedTo !== 'map';

    const speed = needToZoomToLine
      ? ZOOM_TRANSITION_SPEED * 0.6
      : ZOOM_TRANSITION_SPEED;

    if (needToZoomToLine || needToZoomToLines) {
      let bboxMap = this.refs.svg.getBoundingClientRect();

      let bboxLines = activeTest.id
        ? this.refs.activetest.getBoundingClientRect()
        : this.refs.testlines.getBoundingClientRect();

      let bboxActive = this.refs.active
        ? this.refs.active.getBoundingClientRect()
        : {};

      let hasLines = bboxLines.width > 0;
      let bboxFrame = hasLines ? bboxLines : bboxActive;
      let boxFramePorportion = bboxMap.width / bboxLines.width;

      // console.log('has lines', hasLines);
      // console.log('bboxFrame', bboxFrame);

      let zoomTo = hasLines ? boxFramePorportion * 0.5 : 3;

      if (hasLines && bboxLines.height > bboxLines.width) {
        let porportion = bboxMap.height / bboxLines.height;
        zoomTo = porportion * 0.5;
      }

      if (hasLines && activeTest.id) {
        let allLines = this.refs.testlines.getBoundingClientRect();
        let allBoundary = bboxMap.width / allLines.width * 0.5;
        let easierZoom = zoomTo * 0.75;
        zoomTo = easierZoom > allBoundary ? easierZoom : easierZoom;
      }

      if (zoomTo > maxZoom) {
        zoomTo = maxZoom;
      }

      let scaler = zoomTo / this.currentScale;

      let halfWidth = scaler * bboxMap.width * 0.5;
      let halfHeight = scaler * bboxMap.height * 0.5;

      let offset = this.props.panelWidth * 0.5;

      let frameX = scaler * bboxFrame.x;
      let frameY = scaler * bboxFrame.y;

      let mapX = scaler * bboxMap.x;
      let mapY = scaler * bboxMap.y;

      let deltaX = halfWidth - frameX + mapX + offset;
      let deltaY = halfHeight - frameY + mapY;

      if (hasLines) {
        bboxFrame = bboxLines;
        let halfBoxWidth = scaler * bboxFrame.width * 0.5;
        let halfBoxHeight = scaler * bboxFrame.height * 0.5;

        deltaX = deltaX - halfBoxWidth;
        deltaY = deltaY - halfBoxHeight;
      }

      this.currentScale = zoomTo;
      d3
        .select(this.refs.svg)
        .transition()
        .duration(speed)
        .call(
          this.zoom.transform,
          d3.zoomIdentity.translate(deltaX, deltaY).scale(zoomTo)
        );
      this.zooming = true;
    }

    if (needToZoomToMap) {
      this.currentScale = 1;
      d3
        .select(this.refs.svg)
        .transition()
        .duration(speed)
        .call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
      this.zooming = true;
    }
  };

  componentDidUpdate() {
    this.doZoom();
  }

  render() {
    const { width, height } = this.props;
    const { zoomTransform, hovering, hoverAt } = this.state;

    //console.log(hovering)

    let tip = hovering.id ? (
      <div
        className={`ui bottom left popup`}
        style={{
          position: 'absolute',
          width: hovering.isAgent ? '60px' : '120px',
          top: `${hoverAt.pageY + 12}px`,
          left: `${hoverAt.pageX - 18}px`
        }}
      >
        {hovering.isAgent
          ? `${hovering.fullName || hovering.name}`
          : `${hovering.fullName || hovering.name}`}
      </div>
    ) : (
      <div
        className={``}
        style={{
          position: 'absolute',
          top: `${0}px`,
          left: `${0}px`
        }}
      />
    );
    return (
      <div>
        <svg
          ref="svg"
          width={width}
          height={height}
          viewBox={`
          ${width * 0.058} 
          ${height * 0.25} 
          ${width * 0.44} 
          ${height * 0.025}`}
          className="map-root"
          transform={`${zoomTransform}`}
        >
          <g className="countries">{this.generateCountries()}</g>
          <g ref="testlines" className="test-lines">
            {this.generateTestLines()}
          </g>
          <g ref="tests" className="test-markers">
            {this.generateTestMarkers()}
          </g>
          <g className="agent-markers">{this.generateAgentMarkers()}</g>
        </svg>
        <Transition animation={'fade'} duration={250} visible={!!hovering.id}>
          {tip}
        </Transition>
      </div>
    );
  }
}

export default WorldMap;
