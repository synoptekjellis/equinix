import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Image, Label, List } from 'semantic-ui-react';

class InfoPanel extends Component {
  activeTestToHtml = activetest => {
    const color = 'green';
    const size = 'big';
    return (
      <List.Item className="test-listitem">
        <List.Content floated="left" className="speed">
          <Label circular color={color} size={size}>{`${62}`}</Label>
        </List.Content>
        <List.Content>
          <List.Header>{activetest.name}</List.Header>
          <List.Description>{activetest.type}</List.Description>
        </List.Content>
      </List.Item>
    );
  };

  render() {
    const { height, width, active } = this.props;

    const testsHtml = _.map(active.tests, this.activeTestToHtml);

    return (
      <div className="infopanel-frame">
        <div
          className="infopanel"
          style={{ height: `${height}px`, width: `${width}px` }}
        >
          <List divided relaxed="very" selection>
            {testsHtml}
          </List>
        </div>
      </div>
    );
  }
}

export default InfoPanel;
