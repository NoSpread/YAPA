// Just a string
import React, { Component } from 'react';

class Activity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = (word, elementId, isLast) => {
      fetch('https://api.nospread.xyz/yapa/v1/translate', {
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
          document.getElementById("activity").style.display = "block";
        }
      }).catch(e => {
        console.error(e);
      });
    }
    
    const getActivity = () => {
      fetch('https://api.nospread.xyz/yapa/v1/activity', {
        method: "GET",
        headers: {
          "X-API-KEY": this.props.api
        },
      }).then(res => {
        if(res.status == "200")
          return res.json();                   
      }).then(function(data) {
        document.getElementById("activity").innerHTML = 
          `<p id="activityText">Aktivität: toBeTranslated</p>
          <p id="typeText">Typ: toBeTranslated</p>
          <p>Geeignet für: ${data["participants"]} Personen</p>
          <p>Preis: ${data["price"]}</p>
          <p>Link: ${data["link"]}</p>
          <p>Zugänglichkeit: ${data["accessibility"]}</p>`;
        translate(data["activity"], "activityText", false);
        translate(data["type"], "typeText", true);
      }).catch(e => {
        console.error(e);
      });
    }

    const backgroundStyle = {
      display: "none", 
      backgroundColor: "#FAFAFA", 
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