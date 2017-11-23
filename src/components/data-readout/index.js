import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';

class DataReadout extends Component {
  //Data
  columnModel = () => {
    return [
      {
        id: 'name',
        label: 'Name',
        templ: 'name'
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
    ];
  };

  //Head
  renderHead = () => {
    function columnToHeaderCell(cm) {
      return (
        <Table.HeaderCell key={`table-headercell-${cm.id}`}>
          {cm.label}
        </Table.HeaderCell>
      );
    }

    return (
      <Table.Header>
        <Table.Row>{_.map(this.columnModel(), columnToHeaderCell)}</Table.Row>
      </Table.Header>
    );
  };

  //Body
  renderBody = () => {
    return <Table.Body>{this.renderRows()}</Table.Body>;
  };
  renderRows = () => {
    const { locations } = this.props;
    return _.map(locations, this.locationToHtml);
  };
  locationToHtml = location => {
    function columnToCell(cm) {
      return (
        <Table.Cell key={`table-row-${location.id}-cell-${cm.id}`}>
          {location[cm.templ]}
        </Table.Cell>
      );
    }
    return (
      <Table.Row key={`table-row-${location.id}`}>
        {_.map(this.columnModel(), columnToCell)}
      </Table.Row>
    );
  };

  //lifecycle
  componentDidMount() {}

  render() {
    return (
      <div className="data-readout">
        <div className="filter-frame">
          <Input
            fluid
            icon="search"
            placeholder="Search..."
            className="filter"
            size="big"
          />
        </div>
        <div className="data-table">
          <Table celled>
            {this.renderHead()}
            {this.renderBody()}
          </Table>
        </div>
      </div>
    );
  }
}

export default DataReadout;
