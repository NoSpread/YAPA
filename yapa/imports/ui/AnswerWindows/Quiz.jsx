// Display question und answer possibilities
// possibilities are 1 in 4 or true/false

import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = (elementId, isLast) => {
      fetch(`${Meteor.settings.public.endpoint}/translate`, {
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
        //document.getElementsByClassName("correct")[0].style.backgroundColor = "green";
        document.getElementsByClassName("correct")[0].classList.remove('btn-default');
        document.getElementsByClassName("correct")[0].classList.add('btn-success');
        var incorrect_answers = document.getElementsByClassName("incorrect");
        Array.prototype.forEach.call(incorrect_answers, element => {
            element.classList.remove('btn-default');
            element.classList.add('btn-warning');
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
            answerButtons += `<button class="btn btn-default answerButton correct" id="${id.toString()}">${element}</button>`;    
          } else {
            answerButtons += `<button class="btn btn-default answerButton incorrect" id="${id.toString()}">${element}</button>`;
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
        }, 200)

    }
    
    const getQuiz = () => {
      fetch(`${Meteor.settings.public.endpoint}/quiz`, {
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
