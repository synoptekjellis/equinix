import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';

class DataReadout extends Component {
  componentDidMount() {}

  columnModel = () => {
    return [
      {
        label: 'Name',
        templ: 'name'
      },
      {
        label: 'Address',
        templ: 'address'
      },
      {
        label: 'Latitude',
        templ: 'latitude'
      },
      {
        label: 'Longitude',
        templ: 'longitude'
      }
    ];
  };

  renderHead = () => {
    const { locations } = this.props;

    return (
      <Table.Header>
        <Table.Row>
          {_.map(this.columnModel(), cm => {
            return <Table.HeaderCell>{cm.label}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>
    );
  };

  renderBody = () => {
    const { locations } = this.props;
    return (
      <Table.Body>
        {_.map(locations, location => {
          let cells = _.map(this.columnModel(), cm => {
            return <Table.Cell>{location[cm.templ]}</Table.Cell>;
          });

          return <Table.Row>{cells}</Table.Row>;
        })}
      </Table.Body>
    );
  };

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
          <Table celled fluid>
            {this.renderHead()}
            {this.renderBody()}
          </Table>
        </div>
      </div>
    );
  }
}

export default DataReadout;
