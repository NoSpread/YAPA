import React, { Component } from 'react';

class Activity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = (word, elementId, isLast) => {
      fetch(process.env.ENDPOINT + '/translate', {
        method: "POST",
        headers: {
          "X-API-KEY": this.props.api,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `query=${word}&source=en&target=de`
      }).then(res => {
        if (res.status == "200") {
          return res.json(); 
        } else {
          console.log(res);
        }                  
      }).then(function(data) {
        document.getElementById(elementId).innerHTML = document.getElementById(elementId).innerHTML.replace("toBeTranslated", data["output"]);

        if(isLast == true) {
          console.log("should only be one");
          document.getElementById("activity").style.display = "block";
          
          const readString = `Ich kann dir folgende Aktivität vorschlagen. ${data["output"]}`
          Meteor.call("synthesiseText", readString, (err, res) => {
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
    
    const getActivity = () => {
      fetch(process.env.ENDPOINT + '/activity', {
        method: "GET",
        headers: {
          "X-API-KEY": this.props.api
        },
      }).then(res => {
        if(res.status == "200")
          return res.json();                   
      }).then(function(data) {
        document.getElementById("activity").innerHTML = 
          `<p id="activityText" class="answer">Aktivität: toBeTranslated</p>
          <p id="typeText" class="answer">Typ: toBeTranslated</p>
          <p class="answer">Geeignet für: ${data["participants"]} Personen</p>
          <p class="answer">Preis: ${data["price"]}</p>
          <p class="answer">Link: ${data["link"]}</p>
          <p class="answer">Zugänglichkeit: ${data["accessibility"]}</p>`;
        translate(data["type"], "typeText", false);
        translate(data["activity"], "activityText", true);
      }).catch(e => {
        console.error(e);
      });
    }

    const backgroundStyle = {
      display: "none", 
      backgroundColor: "#FFF", 
      height: "100%", 
      width: "100%"
    };

    return (
      <div id="activity" style={backgroundStyle} onLoad={getActivity()}>
      </div>
    );
  }
};

export default Activity;
