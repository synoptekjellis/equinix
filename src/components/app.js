import './app.css';

import { geoMercator, geoPath } from 'd3-geo';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { feature } from 'topojson-client';

import agents from '../api/agents';
import agent46499 from '../api/agents-46499';
import agent47477 from '../api/agents-47477';
import datacenterLocations from '../api/datacenter-locations';
import tests from '../api/tests';
import { updateActive, updateActiveTest } from '../state/actions/map';
import DataReadout from './data-readout';
import InfoPanel from './infopanel';
import WorldMap from './world-map';

function stateToComponent(state) {
  return {
    map: state.map
  };
}

var mockFullAgentCall = {
  46499: agent46499,
  47477: agent47477
};

@connect(stateToComponent)
class App extends Component {
  state = {
    agents: [],
    tests: []
  };

  mapTestsToLocations = () => {
    function testToTestWithLocation(test) {
      //datacenterLocations

      function locationsByMatchingName(datacenterLocation) {
        return test.testName.includes(datacenterLocation.name);
      }

      function locationsToLocationsWithTestData(datacenterLocation) {
        return {
          ...datacenterLocation,
          ...{
            id: test.testId,
            fullName: test.testName,
            testType: test.type
          }
        };
      }

      function locationsToLocation(acc, dsLocation) {
        if (
          acc.name &&
          dsLocation.name &&
          acc.name.length > dsLocation.name.length
        ) {
          return acc;
        }

        return dsLocation;
      }

      var matchingLocation = _.chain(datacenterLocations)
        .filter(locationsByMatchingName)
        .map(locationsToLocationsWithTestData)
        .reduce(locationsToLocation)
        .value();

      return matchingLocation;
    }

    return _.map(tests.test, testToTestWithLocation);
  };

  agentToAgentWithTests = agent => {
    const agentId = agent.id;
    var mockAgent = {
      agents: [
        {
          tests: []
        }
      ]
    };

    var fullAgent = mockFullAgentCall[agentId] || mockAgent;
    var _tests = fullAgent.agents[0].tests;

    var mappedTests = _.map(_tests, t => {
      return _.find(this.testsWithLocation, twl => {
        return twl.id === t.testId;
      });
    });

    let newAgent = {
      ...agent,
      ...{
        tests: mappedTests
      }
    };

    return newAgent;
  };

  //just need this one time.
  // will exit this spot when the .then happens
  testsWithLocation = null;

  componentWillMount() {
    // go get all tests.
    // then perform this mapping...
    // https://api.thousandeyes.com/v6/tests.json --header \
    // "Authorization: Bearer 047ec908-2ada-4e97-a5a5-74fdd5a993ff"
    this.testsWithLocation = this.mapTestsToLocations();
    const decoratedAgents = _.map(agents, this.agentToAgentWithTests);
    this.setState({
      agents: decoratedAgents
    });
  }

  setActive = point => {
    const { dispatch } = this.props;
    dispatch(updateActive(point));
  };

  clearActive = point => {
    const { dispatch } = this.props;
    dispatch(updateActive({}));
  };

  setActiveTest = test => {
    const { dispatch } = this.props;
    dispatch(updateActiveTest(test));
  };

  clearActiveTest = test => {
    const { dispatch } = this.props;
    dispatch(updateActiveTest({}));
  };

  render() {
    const { active, activeTest } = this.props.map;

    const filteredLocations = this.state.agents;

    const height = 600;
    const width = 1280;
    const panelWidth = width * 0.25;

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
            panelWidth={panelWidth}
            height={height}
            locations={filteredLocations}
            active={active}
            activeTest={activeTest}
            setActive={this.setActive}
            clearActive={this.clearActive}
            setActiveTest={this.setActiveTest}
            clearActiveTest={this.clearActiveTest}
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
        {active.id ? (
          <InfoPanel
            height={height}
            width={panelWidth}
            active={active}
            activeTest={activeTest}
            setActiveTest={this.setActiveTest}
            clearActiveTest={this.clearActiveTest}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
