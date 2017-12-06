import './app.css';

import { geoMercator, geoPath } from 'd3-geo';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'semantic-ui-react';
import { feature } from 'topojson-client';

import { getAgent, getConfig, getTest, getTests } from '../api';
import agents from '../api/agents';
import datacenterLocations from '../api/datacenter-locations';
import {
  updateActive,
  updateActiveTest,
  updateAgents,
  updateInfoPanelIndex
} from '../state/actions/map';
import ClientLogo from './client-logo';
import DataReadout from './data-readout';
import InfoPanel from './infopanel';
import groups from './infopanel/groups';
import WorldMap from './world-map';

const TEST_BLACKLIST = ['Oracle Cloud Locations'];

function stateToComponent(state) {
  return {
    map: state.map
  };
}

@connect(stateToComponent)
class App extends Component {
  state = {};

  mapTestsToLocations = tests => {
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
    return new Promise((resolveAgent, rejectAgent) => {
      const agentId = agent.id;
      var mockAgent = {
        agents: [
          {
            tests: []
          }
        ]
      };

      function testByBlackListedItems(test) {
        return TEST_BLACKLIST.indexOf(test.type) === -1;
      }

      function makeNewAgent(data) {
        var fullAgent = data;
        var _tests = fullAgent.agents[0].tests;

        var mappedTests = _.chain(_tests)
          .map(t => {
            return _.find(this.testsWithLocation, twl => {
              return twl.id === t.testId;
            });
          })
          .filter(testByBlackListedItems)
          .value();
        let newAgent = {
          ...agent,
          ...{
            tests: mappedTests
          }
        };
        return newAgent;
      }

      if (agent.ignoreApi) {
        resolveAgent(makeNewAgent.call(this, mockAgent));
      } else {
        getAgent(agentId).then(data => {
          resolveAgent(makeNewAgent.call(this, data));
        });
      }
    });
  };

  //just need this one time.
  // will exit this spot when the .then happens
  testsWithLocation = null;

  componentWillMount() {
    const { dispatch } = this.props;

    // go get all tests.
    // then perform this mapping...
    // https://api.thousandeyes.com/v6/tests.json --header \
    // "Authorization: Bearer 047ec908-2ada-4e97-a5a5-74fdd5a993ff"

    getTests().then(tests => {
      this.testsWithLocation = this.mapTestsToLocations(tests);
      const decoratedAgentPromises = _.map(agents, this.agentToAgentWithTests);

      Promise.all(decoratedAgentPromises).then(decoratedAgents => {
        dispatch(updateAgents(decoratedAgents));
      });
    });
  }

  setActive = point => {
    const { dispatch } = this.props;
    dispatch(updateActiveTest({}));
    dispatch(updateActive(point));
  };

  clearActive = point => {
    const { dispatch } = this.props;
    dispatch(updateActive({}));
    dispatch(updateActiveTest({}));
  };

  setActiveTest = test => {
    const { dispatch } = this.props;
    dispatch(updateActiveTest(test));
    var newIndex = _.findIndex(groups, group => {
      return group.name === test.type;
    });
    this.openInfoPanel(newIndex);
  };

  clearActiveTest = test => {
    const { dispatch } = this.props;
    dispatch(updateActiveTest({}));
  };

  openInfoPanel = index => {
    const { dispatch } = this.props;
    dispatch(updateInfoPanelIndex(index));
  };

  render() {
    const { active, activeTest, activeInfoPanelIndex, agents } = this.props.map;

    const isLoading = agents.length === 0;

    const filteredLocations = agents;

    const height = 800;
    const width = 1440;
    const panelWidth = width * 0.25;

    const animation = 'fade right';
    const duration = 750;

    const hasActiveAgent = !!active.id;

    return (
      <div className="app">
        <div
          className="world-map-frame"
          style={{
            height: `${height}px`
          }}
        >
          <WorldMap
            loading={isLoading}
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
            loading={isLoading}
            locations={filteredLocations}
            active={active}
            setActive={this.setActive}
            clearActive={this.clearActive}
          />
        </div>

        <InfoPanel
          height={height}
          width={panelWidth}
          active={active}
          activeTest={activeTest}
          visible={hasActiveAgent}
          setActiveTest={this.setActiveTest}
          clearActiveTest={this.clearActiveTest}
          activeInfoPanelIndex={activeInfoPanelIndex}
          openInfoPanel={this.openInfoPanel}
        />

        <ClientLogo
          clearActive={this.clearActive}
          clearActiveTest={this.clearActiveTest}
        />
      </div>
    );
  }
}

export default App;
