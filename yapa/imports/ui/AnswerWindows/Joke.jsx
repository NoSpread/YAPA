import React, { Component } from 'react';

class Joke extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const displayJoke = (data) => {
        // Gibt es eine Punchline?
        if(data["joke"] == null) {
            document.getElementById("joke").innerHTML = 
                `<p>${data["setup"]}</p>`;  
            setTimeout(() => {document.getElementById("joke").innerHTML += `<p>\n${data["delivery"]}</p>`}, 2500);
        } else {
            document.getElementById("joke").innerHTML = 
                `<p>${data["joke"]}</p>`;
        }
    }

    const fetchSettings = () => {
      fetch('https://api.nospread.xyz/yapa/v1/joke', {
        method: "GET",
        headers: {
          "X-API-KEY": this.props.api
        },
      }).then(res => {
        if(res.status == "200")
          return res.json();                   
      }).then(function(data) {
        displayJoke(data);
      }).catch(e => {
        console.error(e);
      });
    }

    const backgroundStyle = {
      backgroundColor: "#FAFAFA",
      height: "100%",
      width: "100%",
    };

    return (
      <div id="joke" style={backgroundStyle} onLoad={fetchSettings()}>
      </div>
    );
  }
};

export default Joke;