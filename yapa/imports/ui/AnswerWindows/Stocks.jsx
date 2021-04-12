import React, { Component } from 'react';

class Stocks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const backgroundStyle = {
      backgroundColor: "grey",
      height: "100%",
      width: "100%"
    };

    return (
      <div style={backgroundStyle}>
        <p>These are stocks</p>
      </div>
    );
  }
};

export default Stocks;