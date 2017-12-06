import './index.css';

import _ from 'lodash';
import React, { Component } from 'react';
import { Accordion, Image, Label, List, Transition } from 'semantic-ui-react';

import groups from './groups';

export default class InfoPanel extends Component {
  state = {};

  activeTestToHtml = test => {
    const { activeTest, setActiveTest, clearActiveTest } = this.props;
    const color = 'green';
    const size = 'big';
    const isActive = test.id === activeTest.id;
    const thisGroup = _.find(groups, g => {
      return g.name === test.type;
    });

    const location = test.address || `${test.city_state}, ${test.country}`;

    const ref = isActive ? 'active-infopanel-listitem' : '';

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
        ref={ref}
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

  scrollToElement = () => {};

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
    const { openInfoPanel, activeInfoPanelIndex } = this.props;
    const { index } = titleProps;
    const newIndex = activeInfoPanelIndex === index ? -1 : index;

    openInfoPanel(newIndex);
  };

  groupToPanelHtml = (group, index) => {
    const { active, activeInfoPanelIndex } = this.props;

    const groupedTests = _.groupBy(active.tests, 'type');
    const animation = 'fade right';
    const duration = 750;

    const isActive = activeInfoPanelIndex === index;

    return (
      <div key={`infopanel-accordionpanel-${group.id}`}>
        <Accordion.Title
          active={isActive}
          index={index}
          onClick={this.handleClick}
          className="group-title"
        >
          <Image src={group.logo} height={'100%'} className="group-logo" />
        </Accordion.Title>
        <Accordion.Content active={isActive}>
          <Transition
            animation={animation}
            duration={duration}
            visible={isActive}
          >
            {this.renderTestlist(groupedTests[group.name])}
          </Transition>
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
    const { height, width, active, visible } = this.props;
    const animation = 'fade right';
    const duration = 750;
    console.log(active.tests);

    const contents = (
      <div
        className="infopanel"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        {this.renderTestGroups(groups)}
      </div>
    );

    return (
      <Transition animation={animation} duration={duration} visible={visible}>
        <div className="infopanel-frame">{contents}</div>
      </Transition>
    );
  }
}
