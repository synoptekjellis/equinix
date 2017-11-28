import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';

class DataReadout extends Component {
  //Data
  columnModel = () => {
    return [
      {
        id: 'id',
        label: 'ID',
        templ: 'id'
      },
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
    const { active, setActive, clearActive } = this.props;
    function columnToCell(cm) {
      return (
        <Table.Cell key={`table-row-${location.id}-cell-${cm.id}`}>
          {location[cm.templ]}
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
