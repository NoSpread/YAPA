import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const changeViewFromDashboard = () => {
      document.getElementById('changeViewButton').click();
    }

    const placeHolderStyle = {
      width: "30vw",
      height: "40vh"
    };

    const settingsButtonStyle = {
      width: "2.5em",
      height: "2.5em",
      borderRadius: "50%",
      padding: "0.35em",
      marginBottom: "0.25em"
    };

    const settingsButtonSpacingStyle = {
      margin: "0.5em"
    }

    return (
      <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <h1 id="title">Dashboard</h1>
        <div className="placeholder" style={placeHolderStyle}></div>
        <a href="javascript:;" className="button icon-button" style={settingsButtonSpacingStyle} aria-label="Icon-only Settings Button">
          <img src="/settings.png" className="icon-button__icon" aria-hidden="true" focusable="false" style={settingsButtonStyle} onClick={changeViewFromDashboard}></img>
        </a>
        <button>Start Listening</button>
      </div>
    );
  }
};

export default Dashboard;