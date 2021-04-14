import React, { Component } from 'react';

class Joke extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const displayJoke = (data) => {
        // Gibt es eine Punchline?
        if(data["joke"] == null) {
            var lenghtToWait = 0;
          
            Meteor.call("synthesiseText", data["setup"], (err, res) => {
              if (err) console.error(err)
      
              const blob = new Blob([res], { type: "audio/wav" });
              const url = window.URL.createObjectURL(blob);
      
              document.getElementById("joke").innerHTML = 
                `<p>${data["setup"]}</p>`; 

              const audioElement = document.getElementById("audio")
              
              audioElement.src = url;
              audioElement.play();
              
              const interval = setInterval(() => {

                if (audioElement.ended) {
                  Meteor.call("synthesiseText", data["delivery"], (err, res) => {
                    if (err) console.error(err)
            
                    const blob = new Blob([res], { type: "audio/wav" });
                    const url = window.URL.createObjectURL(blob);
            
                    document.getElementById("joke").innerHTML += `<p>\n${data["delivery"]}</p>`;
                    const audioElement = document.getElementById("audio")
              
                    audioElement.src = url;
                    audioElement.play();
                  });
                  clearInterval(interval)
                }
              }, 500)


            });
        } else {
            document.getElementById("joke").innerHTML = 
              `<p>${data["joke"]}</p>`;
            Meteor.call("synthesiseText", data["joke"], (err, res) => {
              if (err) console.error(err)
      
              const blob = new Blob([res], { type: "audio/wav" });
              const url = window.URL.createObjectURL(blob);
      
              document.getElementById("audio").src = url;
              document.getElementById("audio").play();
            });
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