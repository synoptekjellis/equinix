import './app.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAgent, getConfig, getTestMetrics, getTests } from '../api';
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

const agents = global.agents || [];
const datacenterLocations = global.datacenterLocations || [];
const TEST_BLACKLIST = global.config.blacklist || [];

function stateToComponent(state) {
  return {
    map: state.map
  };
}

@connect(stateToComponent)
class App extends Component {
  state = {
    loading: false
  };

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
        if (!test) {
          return false;
        }

        return TEST_BLACKLIST.indexOf(test.type) === -1;
      }

      function makeNewAgent(data) {
        if (!this.testsWithLocation) {
          return;
        }

        var fullAgent = data;
        var _tests = fullAgent.agents[0].tests;

        //console.log('tests with location', this.testsWithLocation);

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

  testsWithLocation = null;
  componentWillMount() {
    const { dispatch } = this.props;
    getTests().then(tests => {
      this.testsWithLocation = _.filter(this.mapTestsToLocations(tests), t => {
        return t;
      });
      const decoratedAgentPromises = _.map(agents, this.agentToAgentWithTests);

      Promise.all(decoratedAgentPromises).then(decoratedAgents => {
        dispatch(updateAgents(decoratedAgents));
      });
    });
  }

  testToLatencyPromise = test => {
    return getTestMetrics(test.id, 2).then(test => {
      return new Promise((res, rej) => {
        const metrics = test.net.metrics;

        console.log(test.net);
        const sum = _.reduce(
          metrics,
          (acc, val) => {

            //console.log(val)

            return acc + val.avgLatency;
          },
          0
        );
        res({
          id: test.net.test.testId,
          averageLatency: sum / metrics.length
        });
      });
    });
  };

  setActive = point => {
    if (this.state.loading) {
      return;
    }

    const { dispatch } = this.props;
    dispatch(updateActiveTest({}));
    dispatch(updateActive(point));
    console.log(point);
    const tests = point.tests;
    const latencyPromises = _.map(tests, this.testToLatencyPromise);
    this.setState({
      loading: true
    });
    Promise.all(latencyPromises).then(data => {
      const newPoint = {
        ...point,
        tests: _.map(point.tests, t => {
          return { ...t, ..._.find(data, { id: t.id }) };
        })
      };
      dispatch(updateActive(newPoint));
      this.setState({
        loading: false
      });
    });
  };

  clearActive = point => {
    if (this.state.loading) {
      return;
    }
    const { dispatch } = this.props;
    dispatch(updateActive({}));
    dispatch(updateActiveTest({}));
  };

  setActiveTest = test => {
    if (this.state.loading) {
      return;
    }
    const { dispatch } = this.props;
    dispatch(updateActiveTest(test));
    var newIndex = _.findIndex(groups, group => {
      return group.name === test.type;
    });
    this.openInfoPanel(newIndex);
  };

  clearActiveTest = test => {
    if (this.state.loading) {
      return;
    }
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
            loadingAgents={isLoading}
            loadingTests={this.state.loading}
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
