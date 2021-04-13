// Just a string
import React, { Component } from 'react';

class Fortune extends Component {
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
            document.getElementById("fortune").style.display = "block";
          }
        }).catch(e => {
          console.error(e);
        });
      }

    const getFortune = () => {
        fetch('https://api.nospread.xyz/yapa/v1/fortune', {
        method: "GET",
        headers: {
          "X-API-KEY": this.props.api
        },
      }).then(res => {
        if(res.status == "200")
          return res.json();                   
      }).then(function(data) {
        document.getElementById("fortune").innerHTML = `<p id="fortuneText">toBeTranslated</p>`;
        translate(data, "fortuneText", true);
      }).catch(e => {
        console.error(e);
      });
    }

    const backgroundStyle = {
      backgroundColor: "#FAFAFA",
      height: "100%",
      width: "100%",
      display: "none"
    };

    return (
      <div id="fortune" style={backgroundStyle} onLoad={getFortune()}>
      </div>
    );
  }
};

export default Fortune;