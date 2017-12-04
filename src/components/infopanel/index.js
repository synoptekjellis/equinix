import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Accordion, Button, Icon, Image, Label, List } from 'semantic-ui-react';

import groups from './groups';

export default class InfoPanel extends Component {
  state = {
    activeIndex: -1
  };

  activeTestToHtml = test => {
    const { activeTest, setActiveTest, clearActiveTest } = this.props;
    const color = 'green';
    const size = 'big';
    const isActive = test.id === activeTest.id;
    const thisGroup = _.find(groups, g => {
      return g.name === test.type;
    });

    const location = test.address || `${test.city_state}, ${test.country}`;

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
        <List.Content floated="right" className="speed">
          <Label circular color={color} size={size}>{`${62}`}</Label>
        </List.Content>
        <List.Content floated="left" className="icon">
          <Image src={thisGroup.icon} size="mini" />
        </List.Content>
        <List.Content>
          <List.Header>{test.name}</List.Header>
          <List.Description>{location}</List.Description>
        </List.Content>
      </List.Item>
    );
  };

  renderTestlist = tests => {
    const testsHtml = _.map(tests, this.activeTestToHtml);

    return (
      <List divided relaxed="very" selection>
        {testsHtml}
      </List>
    );
  };

  renderGroupPanels = groups => {
    return _.map(groups, this.groupToPanelHtml);
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  groupToPanelHtml = (group, index) => {
    const { active } = this.props;
    const { activeIndex } = this.state;
    const groupedTests = _.groupBy(active.tests, 'type');

    return (
      <div key={`infopanel-accordionpanel-${group.id}`}>
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          {`${group.name}`}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          {this.renderTestlist(groupedTests[group.name])}
        </Accordion.Content>
      </div>
    );
  };

  renderTestGroups = groups => {
    return (
      <Accordion fluid styled>
        {this.renderGroupPanels(groups)}
      </Accordion>
    );
  };

  render() {
    const { height, width, active } = this.props;

    console.log(active.tests);

    return (
      <div className="infopanel-frame">
        <div
          className="infopanel"
          style={{ height: `${height}px`, width: `${width}px` }}
        >
          {this.renderTestGroups(groups)}
        </div>
      </div>
    );
  }
}
