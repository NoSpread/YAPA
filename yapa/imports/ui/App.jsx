import React, { Component } from 'react';
import Dashboard from './Dashboard';
import Settings from './Settings';
import Login from './Login';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboard: false,
      settings: false,
      login: true,
      api : "something"
    };
  };


  render() {
    const changeView = () => {
      var changeViewInput = document.getElementById("changeViewInput");
      switch (changeViewInput.value) {
        case "dashboard":
          this.setState({
            dashboard: true,
            settings: false,
            login: false
          });
        break;
        case "settings":
          this.setState({
            dashboard: false,
            settings: true,
            login: false
          });
        break;
        case "login":
          this.setState({
            dashboard: false,
            settings: false,
            login: true
          });
        break;
      }
    };

    const setApiKey = () => {
      this.setState({
        api: document.getElementById("setApi").value
      });
    }

    const centerStyle = {
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    };

    return (
      <div className="app" style={centerStyle}>
        <header>
          <div className="app-bar">
            <input type="text" id="changeViewInput" onClick={() => changeView()} hidden/>
            <input type="text" id="setApi" onClick={() => setApiKey()} hidden/>
          </div>
        </header>
        <div className="main" id="main">
          {this.state.dashboard? (<Dashboard api={this.state.api}/>) : null}
          {this.state.settings? (<Settings api={this.state.api}/>) : null}
          {this.state.login? (<Login/>) : null}
        </div>
      </div>
    );
  }
}

export default App;