import React, { Component } from 'react';
import Conversation from './AnswerWindows/Conversation';
import Activity from './AnswerWindows/Activity';
import Fortune from './AnswerWindows/Fortune';
import Joke from './AnswerWindows/Joke';
import Path from './AnswerWindows/Path';
import Quiz from './AnswerWindows/Quiz';
import Stocks from './AnswerWindows/Stocks';
import { Meteor } from 'meteor/meteor';


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

    
    const recordAudio = () =>
      new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = []
    
        mediaRecorder.ondataavailable = function(e) {
          audioChunks.push(e.data);
        }
    
        const start = () => {
          mediaRecorder.start(100);
          document.getElementById("recordButton").innerHTML = "🔴"
        }

        const stop = () =>
          new Promise(async resolve => {
            mediaRecorder.addEventListener("stop", () => {   
              const audioBlob = new Blob(audioChunks, {type: 'audio/ogg;codecs=opus'})
              var reader = new FileReader();
              reader.readAsDataURL(audioBlob); 
              reader.onloadend = function() {
                var base64data = reader.result;                                  
                Meteor.call("speechToText", base64data, (err, res) => {
                  document.getElementById("recordButton").innerHTML = "🎤"
                  resolve(res)
                })
              }
            });
    
            mediaRecorder.stop();
          });
    
        resolve({ start, stop });
    });

    const sleep = time => new Promise(resolve => setTimeout(resolve, time));

    const clickRecBtn = async () => {
      const recorder = await recordAudio();
      recorder.start();
      
      setTimeout( async () => {
        const transskript = await recorder.stop();
        const transskript_text = transskript.results[0].alternatives[0].transcript

        document.getElementById('inputText').value = transskript_text
        const search = {
          value: transskript_text
        }
        searchKeyWord(search)
      }, 5000)
    }

    const searchKeyWord = (e) => {
      console.log(e.value)
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

      var cardBools = [
        e.value.toLowerCase().includes("aktivität"),
        e.value.toLowerCase().includes("glückskeks"),
        e.value.toLowerCase().includes("witz"),
        e.value.toLowerCase().includes("weg"),
        e.value.toLowerCase().includes("quiz"),
        e.value.toLowerCase().includes("aktien")
      ];
      e.value = "";
      
      var numOfTrue = 0;
      cardBools.forEach(element => {
        if(element == true) {
          numOfTrue++;
        }
      });

      // Don't let it handle too much
      if(numOfTrue >= 2) {
        var response = "Leider kann ich nicht so viel auf einmal machen";
        Meteor.call("synthesiseText", response, (err, res) => {
          if (err) console.error(err)
  
          console.log("something");
          const blob = new Blob([res], { type: "audio/wav" });
          const url = window.URL.createObjectURL(blob);
  
          document.getElementById("audio").src = url;
          document.getElementById("audio").play();
          console.log("nothing");
        });

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
            color: #9b9b9b">${response}</p>
          </div>
        </div>`;
      } 
      // Couldn't understand
      else if (cardBools[0] == false && 
               cardBools[1] == false && 
               cardBools[2] == false && 
               cardBools[3] == false && 
               cardBools[4] == false &&
               cardBools[5] == false) {
        var response = "Das konnte ich leider nicht verstehen. Könntest du das wiederholen?";
        Meteor.call("synthesiseText", response, (err, res) => {
          if (err) console.error(err)
  
          console.log("something");
          const blob = new Blob([res], { type: "audio/wav" });
          const url = window.URL.createObjectURL(blob);
  
          document.getElementById("audio").src = url;
          document.getElementById("audio").play();
          console.log("nothing");
        });
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
            color: #9b9b9b">${response}</p>
          </div>
        </div>`;
      } 
      // Handle the request
      else {
        this.setState({ 
          activity: cardBools[0],
          fortune: cardBools[1],
          joke: cardBools[2],
          path: cardBools[3],
          quiz: cardBools[4],
          stocks: cardBools[5],
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

    const centerContent = {
      display: "flex",
      flexFlow: "column nowrap",
      flexBasis: "10%",
      justifyContent: "center",
      alignItems: "center"
    }

    return (
      <div style={centerContent}>
        <h1 id="title">Dashboard</h1>

        <div className="h-75 d-inline-block">
          <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="panel panel-default" style={{height: "35vh", paddingBottom: "1vh"}}>
                        <div id="content" className="panel-body">
                          {this.state.conversation? (<Conversation />) : null}
                          {this.state.activity? (<Activity api={getApi()}/>) : null}
                          {this.state.fortune? (<Fortune api={getApi()}/>) : null}
                          {this.state.joke? (<Joke api={getApi()}/>) : null}
                          {this.state.path? (<Path api={getApi()}/>) : null}
                          {this.state.quiz? (<Quiz api={getApi()}/>) : null}
                          {this.state.stocks? (<Stocks api={getApi()}/>) : null}
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-4 text-right">
                <span className="btn btn-default" onClick={() => changeViewFunction()}> <i className="glyphicon glyphicon-cog"></i></span>
              </div>
              <div className="col-md-4">
                <div className="input-group" id="inputBar">
                    <input type="text" className="form-control" id="inputText" placeholder="Frag mich was!"/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={() => {searchKeyWord(document.getElementById("inputText"))}}>Enter</button>
                    </span>
                </div>
              </div>
              <div className="col-md-4">
                <button className="btn btn-default" id="recordButton" onClick={() => clickRecBtn()}>🎤</button>
              </div>
            </div>
          </div>
        </div>
        <audio id="audio">
          <source src=""/>
        </audio>
      </div>
    );
  }
};

export default Dashboard;
