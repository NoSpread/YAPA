// Display question und answer possibilities
// possibilities are 1 in 4 or true/false

import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showAnswer = () => {
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
            `<p style="gridRowStart: 1; gridRowEnd: 2">${data["results"][0]["question"]}</p>`;
        
        // Add Answers
        var answerButtons = "";
        results.forEach(element => {
            if(data["results"][0]["correct_answer"] == element) {
                answerButtons += `<button class="answerButton correct">${element}</button>`;    
            } else {
                answerButtons += `<button class="answerButton incorrect">${element}</button>`;
            }    
        }); 
        document.getElementById("quiz").innerHTML += answerButtons;

        // Add OnClick Show Answer
        document.getElementById("quiz").querySelectorAll(".answerButton").forEach(element => {
            element.addEventListener("click", () => showAnswer());
        });
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
        backgroundColor: "#FAFAFA",
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "auto auto"
    };

    return (
      <div id="quiz" style={backgroundStyle} onLoad={getQuiz()}>
      </div>
    );
  }
};

export default Quiz;