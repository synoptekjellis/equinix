import _ from 'lodash';
import React, { Component } from 'react';
import { Icon, Input, Label, Menu, Table } from 'semantic-ui-react';

import columnModel from './column-model';

export default class DataReadoutListItem extends Component {
  render() {
    const { active, setActive, clearActive, location } = this.props;

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

    const ref = isActive ? 'active-row' : '';

    return (
      <Table.Row
        active={isActive}
        onClick={event => {
          if (isActive) {
            clearActive();
          } else {
            setActive(location);
          }
        }}
      >
        {_.map(columnModel(), columnToCell)}
      </Table.Row>
    );
  }
}
