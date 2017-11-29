import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, Label, List } from 'semantic-ui-react';

export default class InfoPanel extends Component {
  activeTestToHtml = test => {
    const { activeTest, setActiveTest, clearActiveTest } = this.props;

    const color = 'green';
    const size = 'big';

    const isActive = test.id === activeTest.id;

    return (
      <List.Item
        key={`infopanel-listitem-${test.id}`}
        className="test-listitem"
        onClick={() => {
          if (isActive) {
            clearActiveTest();
          } else {
            setActiveTest(test);
          }
        }}
        active={isActive}
      >
        <List.Content floated="left" className="speed">
          <Label circular color={color} size={size}>{`${62}`}</Label>
        </List.Content>
        <List.Content>
          <List.Header>{test.name}</List.Header>
          <List.Description>{test.type}</List.Description>
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
