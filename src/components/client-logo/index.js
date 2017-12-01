import './index.css';

import React, { Component } from 'react';

import { CLIENT_LOGO } from './../assets';

export default class ClientLogo extends Component {
  render() {
    const { clearActive, clearActiveTest } = this.props;
    const width = 180;
    const margin = 30;

    return (
      <div
        className={`client-logo-frame`}
        style={{
          top: `${margin}px`,
          right: `${margin + width}px`
        }}
      >
        <div
          className={`client-logo`}
          style={{
            width: `${width}px`
          }}
        >
          <img
            className={`client-logo-glyph`}
            src={CLIENT_LOGO}
            alt={`Equinix Logo`}
            style={{
              width: `${width}px`
            }}
            onClick={() => {
              clearActive();
              clearActiveTest();
            }}
          />
        </div>
      </div>
    );
  }
}
