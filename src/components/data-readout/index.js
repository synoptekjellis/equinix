import './index.css';

import React, { Component } from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';

class DataReadout extends Component {
  componentDidMount() {}

  renderHead = () => {
    const { locations } = this.props;

    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Header</Table.HeaderCell>
          <Table.HeaderCell>Header</Table.HeaderCell>
          <Table.HeaderCell>Header</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  };

  renderBody = () => {
    const { locations } = this.props;
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>First</Label>
          </Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  };

  render() {
    return (
      <div className="data-readout">
        <div className="filter-frame">
          <Input fluid />
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
