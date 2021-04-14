// Display question und answer possibilities
// possibilities are 1 in 4 or true/false

import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = (elementId, isLast) => {
      fetch('https://api.nospread.xyz/yapa/v1/translate', {
        method: "POST",
        headers: {
          "X-API-KEY": this.props.api,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `query=${document.getElementById(elementId).innerHTML}&source=en&target=de`
      }).then(res => {
        if (res.status == "200") {
          return res.json(); 
        } else {
          console.log(res);
        }                  
      }).then(function(data) {
        document.getElementById(elementId).innerHTML = data["output"];

        if(isLast == true) {
          document.getElementById("quiz").style.display = "grid";
          Meteor.call("synthesiseText", document.getElementById("questionText").innerHTML, (err, res) => {
            if (err) console.error(err)
    
            const blob = new Blob([res], { type: "audio/wav" });
            const url = window.URL.createObjectURL(blob);
    
            document.getElementById("audio").src = url;
            document.getElementById("audio").play();
          });
        }
      }).catch(e => {
        console.error(e);
      });
    }

    const revealAnswer = () => {
        document.getElementsByClassName("correct")[0].style.backgroundColor = "green";
        var incorrect_answers = document.getElementsByClassName("incorrect");
        Array.prototype.forEach.call(incorrect_answers, element => {
          element.style.backgroundColor = "red"; 
        });   
    }

    const displayQuiz = (data) => {
        // Shuffle answers alphabetically
        var results = data["results"][0]["incorrect_answers"];
        results[results.length] = data["results"][0]["correct_answer"];
        results.sort((a, b) => a.localeCompare(b));

        // Add Question
        document.getElementById("quiz").innerHTML = 
          `<p style="gridRowStart: 1; gridRowEnd: 2" id="questionText">${data["results"][0]["question"]}</p>`;
        translate("questionText", false);

        // Add Answers
        var answerButtons = "";
        var id = 0;
        results.forEach(element => {
          id++;
          if(data["results"][0]["correct_answer"] == element) {
            answerButtons += `<button class="answerButton correct" id="${id.toString()}">${element}</button>`;    
          } else {
            answerButtons += `<button class="answerButton incorrect" id="${id.toString()}">${element}</button>`;
          }             
        }); 
        document.getElementById("quiz").innerHTML += answerButtons;

        // Add OnClick Show Answer
        const elements = document.getElementsByClassName("answerButton")
        const translateInterval = setInterval(() => {
          if(id == 1) {
            translate(id, true);
            //elements[id].addEventListener("click", () => revealAnswer());
            clearInterval(translateInterval)
          } else {
            translate(id, false);
          }
            id--;
          elements[id].addEventListener("click", () => revealAnswer());
            console.log("Addded EL for id=", id);
        }, 200)

    }
    
    const getQuiz = () => {
      fetch('https://api.nospread.xyz/yapa/v1/quiz', {
        method: "POST",
        headers: {
          "X-API-KEY": this.props.api,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `amount=1`
      }).then(res => {
        if(res.status == "200")
          return res.json();                   
      }).then(function(data) {
        displayQuiz(data);
      }).catch(e => {
        console.error(e);
      });
    }

    const backgroundStyle = {
        backgroundColor: "#FFF",
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "auto auto",
        display: "none"
    };

    return (
      <div id="quiz" style={backgroundStyle} onLoad={getQuiz()}>
      </div>
    );
  }
};

export default Quiz;
