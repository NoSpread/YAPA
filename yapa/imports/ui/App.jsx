import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Settings from './Settings';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {page: true};
  };

  


  

  render() {
    const changeView = () => {
      this.setState({page: !this.state.page});
    };

    const centerStyle = {
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    };

    return (
      <div className="app" style={centerStyle}>
        <header>
          <div className="app-bar">
            <button id="changeViewButton" onClick={changeView} hidden></button>
          </div>
        </header>
        <div className="main">
          {this.state.page? (<Dashboard />) : (<Settings />)}
        </div>
      </div>
    );
  }
}

export default App;