import { geoMercator, geoPath } from 'd3-geo';
import React, { Component } from 'react';
import { feature } from 'topojson-client';

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
  render() {
    const { width, height } = this.props;

    return (
      <svg width={width} height={height} viewBox="0 0 800 450">
        <g className="countries">
          {this.state.worldData.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(this.projection())(d)}
              className="country"
              fill={`rgba(38,50,56,${1 / this.state.worldData.length * i})`}
              stroke="#FFFFFF"
              strokeWidth={0.5}
            />
          ))}
        </g>
        <g className="markers">
          <circle
            cx={this.projection()([8, 48])[0]}
            cy={this.projection()([8, 48])[1]}
            r={10}
            fill="#E91E63"
            className="marker"
          />
        </g>
      </svg>
    );
  }
}

export default WorldMap;
