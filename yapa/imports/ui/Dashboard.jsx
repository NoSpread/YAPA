import React, { Component } from 'react';
import Conversation from './AnswerWindows/Conversation';
import Fortune from './AnswerWindows/Fortune';
import Joke from './AnswerWindows/Joke';
import Path from './AnswerWindows/Path';
import Quiz from './AnswerWindows/Quiz';
import Stocks from './AnswerWindows/Stocks';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: false,
      fortune: false,
      joke: false,
      path: false,
      quiz: false,
      stocks: false,
    };
  }

  render() {
    // To Change between Login, Dashboard & Settings
    const changeViewFunction = () => {
      document.getElementById("changeViewInput").value = "settings";
      document.getElementById("changeViewInput").click();
    }

    const searchKeyWord = (e) => {
      var fortuneBool = e.value.includes("fortune");
      var jokeBool = e.value.includes("joke");
      var pathBool = e.value.includes("path");
      var quizBool = e.value.includes("quiz");
      var stocksBool = e.value.includes("stocks");
      

      // Don't let it handle too much
      if(pathBool == true && stocksBool == true) {
        this.setState({      
          stocks: false,
          path: false
        });
        e.value = "I can't handle this much at once";
      } 
      // Or too few
      else if (e.value == "") {
        this.setState({      
          stocks: stocksBool,
          path: pathBool
        });
        e.value = "If I should do something for you, you must tell me what";
      } 
      // Couldn't understand
      else if (pathBool == false && stocksBool == false) {
        this.setState({      
          stocks: stocksBool,
          path: pathBool
        });
        e.value = "I couldn't quite catch that. \nCould you please repeat it?";
      } 
      // Handled the request
      else {
        this.setState({ 
          fortune: fortuneBool,
          joke: jokeBool,
          path: pathBool,
          quiz: quizBool,
          stocks: stocks
        });
        e.value = "Here you go";
      }
    };

    const getApi = () => {
      return this.props.api;
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

    const userButtonsStyle = {
      display: "flex",
      justifyContent: "center"
    }

    return (
      <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <h1 id="title" style={{textAlign: "center"}}>Dashboard</h1>
        <div id="placeHolder" className="placeholder" style={placeHolderStyle}>
          {this.state.conversation? (<Conversation />) : null}
          {this.state.fortune? (<Fortune />) : null}
          {this.state.joke? (<Joke />) : null}
          {this.state.path? (<Path />) : null}
          {this.state.quiz? (<Quiz />) : null}
          {this.state.stocks? (<Stocks />) : null}
        </div>
        <div style={userButtonsStyle}>
          <a className="button icon-button" style={settingsButtonSpacingStyle} aria-label="Icon-only Settings Button">
            <img src="/settings.png" className="icon-button__icon" aria-hidden="true" focusable="false" style={settingsButtonStyle} onClick={() => changeViewFunction()}></img>
          </a>
          <input type="text" id="inputText"/>
          <button onClick={() => searchKeyWord(document.getElementById("inputText"))}>Enter</button>
          {/* <button>Start Listening</button> */}
        </div>       
      </div>
    );
  }
};

export default Dashboard;