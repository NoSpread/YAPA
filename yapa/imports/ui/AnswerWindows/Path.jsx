import React, { Component } from 'react';

class Path extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const backgroundStyle = {
      backgroundColor: "orange",
      height: "100%",
      width: "100%"
    };

    return (
      <div style={backgroundStyle}>
        <p>These are path data</p>
      </div>
    );
  }
};

export default Path;