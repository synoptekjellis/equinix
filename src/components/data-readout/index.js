import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';

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
  columnModel = () => {
    return [
      // {
      //   id: 'id',
      //   label: 'ID',
      //   templ: 'id'
      // },
      {
        id: 'name',
        label: 'Name',
        templ: 'name'
      },
      {
        id: 'tests',
        label: '# of Tests',
        templ: (row, col) => {
          return row.tests.length;
        }
      },
      {
        id: 'address',
        label: 'Address',
        templ: 'address'
      },
      {
        id: 'latitude',
        label: 'Latitude',
        templ: 'latitude'
      },
      {
        id: 'longitude',
        label: 'Longitude',
        templ: 'longitude'
      }

      // {
      //   id: 'notes',
      //   label: 'Notes',
      //   templ: 'notes'
      // }
    ];
  };

  //Head
  renderHead = () => {
    const { sortBy, sortAsc } = this.state;

    function columnToHeaderCell(cm) {
      let sortedBy = false;
      if (sortBy.id === cm.id) {
        sortedBy = true;
      }

      const label = sortedBy ? <b>{cm.label}</b> : cm.label;
      return (
        <Table.HeaderCell
          key={`table-headercell-${cm.id}`}
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
          {_.map(this.columnModel(), columnToHeaderCell.bind(this))}
        </Table.Row>
      </Table.Header>
    );
  };

  //Body
  renderBody = () => {
    return <Table.Body>{this.renderRows()}</Table.Body>;
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
  locationToHtml = location => {
    const { active, setActive, clearActive } = this.props;

    function columnToCell(cm) {
      let content = '';
      if (_.isString(cm.templ)) {
        content = location[cm.templ];
      }

      if (_.isFunction(cm.templ)) {
        content = cm.templ(location, cm);
      }

      return (
        <Table.Cell key={`table-row-${location.id}-cell-${cm.id}`}>
          {content}
        </Table.Cell>
      );
    }

    let isActive = false;
    if (active.id === location.id) {
      isActive = true;
    }

    return (
      <Table.Row
        active={isActive}
        key={`table-row-${location.id}`}
        onClick={event => {
          if (isActive) {
            clearActive();
          } else {
            setActive(location);
          }
        }}
      >
        {_.map(this.columnModel(), columnToCell)}
      </Table.Row>
    );
  };

  //lifecycle
  componentDidMount() {}

  render() {
    return (
      <div className="data-readout">
        {/* <div className="filter-frame">
          <Input
            fluid
            icon="search"
            placeholder="Search..."
            className="filter"
            size="big"
          />
        </div> */}
        <div className="data-table">
          <Table celled selectable>
            {this.renderHead()}
            {this.renderBody()}
          </Table>
        </div>
      </div>
    );
  }
}

export default DataReadout;
