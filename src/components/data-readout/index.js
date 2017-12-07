import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dimmer, Header, Loader, Segment, Table } from 'semantic-ui-react';

import columnModel from './column-model';
import DataReadoutListItem from './listitem';

class DataReadout extends Component {
  state = {
    sortBy: {
      id: 'name',
      label: 'Name',
      templ: 'name'
    },
    sortAsc: true
  };

  //Data

  //Head
  renderHead = () => {
    const { sortBy, sortAsc } = this.state;

    function columnToHeaderCell(cm) {
      let sortedBy = false;
      if (sortBy.id === cm.id) {
        sortedBy = true;
      }

      let direction = sortAsc ? 'ascending' : 'descending';

      const label = cm.label;
      return (
        <Table.HeaderCell
          key={`table-headercell-${cm.id}`}
          sorted={sortedBy ? direction : null}
          style={{
            minWidth: cm.minWidth || 'auto'
          }}
          onClick={() => {
            this.setState({
              sortBy: cm,
              sortAsc: sortBy.id === cm.id ? !sortAsc : true
            });
          }}
        >
          {label}
        </Table.HeaderCell>
      );
    }

    return (
      <Table.Header>
        <Table.Row>
          {_.map(columnModel(), columnToHeaderCell.bind(this))}
        </Table.Row>
      </Table.Header>
    );
  };

  //Body
  renderBody = () => {
    return <Table.Body>{this.renderRows()}</Table.Body>;
  };

  locationToHtml = location => {
    const { active, loadingAgents } = this.props;

    let isActive = false;
    if (active.id === location.id) {
      isActive = true;
    }

    return (
      <DataReadoutListItem
        ref={isActive ? 'active-data-readout-listitem' : ''}
        {...this.props}
        disable={loadingAgents}
        location={location}
        key={`table-row-${location.id}`}
      />
    );
  };

  renderRows = () => {
    const { locations } = this.props;
    const { sortBy, sortAsc } = this.state;
    let sortedLocations = _.sortBy(locations, sortBy.templ);
    if (!sortAsc) {
      sortedLocations = _.reverse(sortedLocations);
    }
    let mapped = _.map(sortedLocations, this.locationToHtml);
    return mapped;
  };

  scrollToActiveRow = () => {
    var activeRow = this.refs['active-data-readout-listitem'];
    if (activeRow) {
      ReactDOM.findDOMNode(activeRow).scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  //lifecycle
  componentDidUpdate() {
    this.scrollToActiveRow();
  }

  render() {
    const { loadingAgents, loadingTests, active } = this.props;

    if (loadingAgents) {
      return (
        <div className="data-readout">
          <div className="data-readout-header">
            <Header size="large">Equinix Datacenters</Header>
          </div>
          <div className="data-table">
            <Segment className="loader-frame">
              <Table celled selectable sortable>
                {this.renderHead()}
              </Table>
              <Dimmer active inverted>
                <Loader size="large">Getting Agents</Loader>
              </Dimmer>
            </Segment>
          </div>
        </div>
      );
    }

    const headerText = loadingTests
      ? `Getting Latency Information for ${active.name} ...`
      : `Equinix Datacenters`;

    return (
      <div className="data-readout">
        <div className="data-readout-header">
          <div>
            <Header size="large" className="data-readout-header-text">
              {headerText}{' '}
              <Loader
                active
                inline
                size="small"
                className="data-readout-header-loader"
                style={{
                  visibility: loadingTests ? 'inherit' : 'hidden'
                }}
              />
            </Header>
          </div>
        </div>
        <div className="data-table">
          <Table celled selectable={!loadingTests} sortable>
            {this.renderHead()}
            {this.renderBody()}
          </Table>
        </div>
      </div>
    );
  }
}

export default DataReadout;
