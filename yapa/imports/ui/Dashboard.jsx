import React, { Component } from 'react';
import Conversation from './AnswerWindows/Conversation';
import Activity from './AnswerWindows/Activity';
import Fortune from './AnswerWindows/Fortune';
import Joke from './AnswerWindows/Joke';
import Path from './AnswerWindows/Path';
import Quiz from './AnswerWindows/Quiz';
import Stocks from './AnswerWindows/Stocks';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversation: true,
      fortune: false,
      joke: false,
      path: false,
      quiz: false,
      stocks: false,
      activity: false
    };
  }

  render() {
    // To Change between Login, Dashboard & Settings
    const changeViewFunction = () => {
      document.getElementById("changeViewInput").value = "settings";
      document.getElementById("changeViewInput").click();
    }

    const searchKeyWord = (e) => {
      this.setState({ 
        fortune: false,
        joke: false,
        path: false,
        quiz: false,
        stocks: false,
        conversation: true
      });

      document.getElementById("chat-content").innerHTML += 
        `<div className="media media-chat">
          <div className="media-body" style="
            -webkit-box-flex: initial;
            flex: initial;
            display: table;
            min-width: 0">
            <p style="position: relative;
            padding: 6px 8px;
            margin: 4px 0;
            background-color: #f5f6f7;
            border-radius: 3px;
            font-weight: 100;
            color: #9b9b9b">${e.value}</p>
          </div>
        </div>`;

      var activityBool = e.value.toLowerCase().includes("aktivität");
      var fortuneBool = e.value.toLowerCase().includes("glückskeks");
      var jokeBool = e.value.toLowerCase().includes("witz");
      var pathBool = e.value.toLowerCase().includes("route");
      var quizBool = e.value.toLowerCase().includes("quiz");
      var stocksBool = e.value.toLowerCase().includes("aktien");
      e.value = "";
      

      // Don't let it handle too much
      if(pathBool == true && stocksBool == true) {
        document.getElementById("chat-content").innerHTML += 
        `<div className="media media-chat media-chat-reverse">
          <div className="media-body" style="
            -webkit-box-flex: initial;
            flex: initial;
            display: table;
            min-width: 0">
            <p style="position: relative;
            padding: 6px 8px;
            margin: 4px 0;
            border-radius: 3px;
            font-weight: 100;
            float: right;
            clear: right;
            background-color: #48b0f7;
            color: #fff
            color: #9b9b9b">I can't handle this much at once</p>
          </div>
        </div>`;
      } 
      // Couldn't understand
      else if (activityBool == false && 
               fortuneBool == false && 
               jokeBool == false && 
               pathBool == false && 
               quizBool == false &&
               stocksBool == false) {
        document.getElementById("chat-content").innerHTML += 
        `<div className="media media-chat media-chat-reverse">
          <div className="media-body" style="
            -webkit-box-flex: initial;
            flex: initial;
            display: table;
            min-width: 0">
            <p style="position: relative;
            padding: 6px 8px;
            margin: 4px 0;
            border-radius: 3px;
            font-weight: 100;
            float: right;
            clear: right;
            background-color: #48b0f7;
            color: #fff
            color: #9b9b9b">I couldn't quite catch that. \nCould you please repeat it?</p>
          </div>
        </div>`;
      } 
      // Handle the request
      else {
        this.setState({ 
          activity: activityBool,
          fortune: fortuneBool,
          joke: jokeBool,
          path: pathBool,
          quiz: quizBool,
          stocks: stocksBool,
        });

        // Hide Conversation
        document.getElementById("chat-content").innerHTML = "";
        var x = document.getElementById("conversation");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }
    };

    const getApi = () => {
      return this.props.api;
    }

    const getId = () => {
      return this.props.id;
    }

    const settingsButtonStyle = {
      width: "2.5em",
      height: "2.5em",
      borderRadius: "50%",
      padding: "0.35em",
      marginBottom: "0.25em"
    };

    const centerContent = {
      display: "flex",
      flexFlow: "column nowrap",
      flexBasis: "10%",
      justifyContent: "center",
      alignItems: "center"
    }

    const inputBar = {
      display: "flex",
      flexFlow: "row nowrap",
      flexBasis: "10%",
      justifyContent: "center",
      alignItems: "center"
    }

    return (
      <div style={centerContent}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <h1 id="title">Dashboard</h1>
        <div id="content" style={{flex:"80%"}}>
          {this.state.conversation? (<Conversation />) : null}
          {this.state.activity? (<Activity api={getApi()}/>) : null}
          {this.state.fortune? (<Fortune api={getApi()}/>) : null}
          {this.state.joke? (<Joke api={getApi()}/>) : null}
          {this.state.path? (<Path api={getApi()}/>) : null}
          {this.state.quiz? (<Quiz api={getApi()}/>) : null}
          {this.state.stocks? (<Stocks api={getApi()}/>) : null}
        </div>
        <div style={inputBar}>
          <a className="button icon-button" style={{margin: "0.5em"}} aria-label="Icon-only Settings Button">
            <img src="/settings.png" className="icon-button__icon" aria-hidden="true" focusable="false" style={settingsButtonStyle} onClick={() => changeViewFunction()}></img>
          </a>
            <input type="text" id="inputText"/>
            <button onClick={() => {searchKeyWord(document.getElementById("inputText"))}}>Enter</button>
        </div>     
      </div>
    );
  }
};

export default Dashboard;