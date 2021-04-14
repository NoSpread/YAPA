import React, { Component } from 'react';

class Path extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const getPathData = (data) => {
      if(data["movement_type"] === null) {
        document.getElementById("conversation").style.display = "block";

        var textToReadAloud = "Du hast keinen Fortbewegungstyp ausgewählt";
        Meteor.call("synthesiseText", textToReadAloud, (err, res) => {
          if (err) console.error(err)
  
          const blob = new Blob([res], { type: "audio/wav" });
          const url = window.URL.createObjectURL(blob);
  
          document.getElementById("audio").src = url;
          document.getElementById("audio").play();
        });
        document.getElementById("chat-content").innerHTML = 
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
            color: #9b9b9b">${textToReadAloud}</p>
          </div>
        </div>`;
      } else {
        var start = `${data["residenceCode"]}%20${data["residenceCity"]}%20${data["residenceStreet"].replaceAll(" ", "%20")}`;
        var end = `${data["workplaceCode"]}%20${data["workplaceCity"]}%20${data["workplaceStreet"].replaceAll(" ", "%20")}`;

        fetch(`https://api.nospread.xyz/yapa/v1/route/${data["movement_type"]}`, {
          method: "POST",
          headers: {
            "X-API-KEY": this.props.api,
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `start=${start}&end=${end}`
        }).then(res => {
          if(res.status == "200")
            return res.json();                   
        }).then(function(data) {

          var time = new Date(0);
          time.setSeconds(data["travelDuration"]); 
          
          const timeHourSuf = (time) => {
            if (time > 1) return "Stunden"
            else return "Stunde"
          }
          
          const timeMinSuf = (time) => {
            if (time > 1) return "Minuten"
            else return "Minute"
          }

          var timeTraffic = new Date(0);
          timeTraffic.setSeconds(data["travelDurationTraffic"]);

          document.getElementById("path").innerHTML = 
            `<p class="answer">Reisedauer: ${time.getHours()} ${timeHourSuf(time.getHours())}, ${time.getMinutes()} ${timeMinSuf(time.getMinutes())}</p>
            <p class="answer">Aktuelle Verkehrslage: ${timeTraffic.getHours()} ${timeHourSuf(timeTraffic.getHours())}, ${timeTraffic.getMinutes()} ${timeMinSuf(timeTraffic.getMinutes())}</p>
            <p class="answer">Entfernung: ${data["travelDistance"].toString().replace(".", ",")} km</p>`;
                   
            // Read alloud
          var answers = document.getElementsByClassName("answer");
          var stringToReadAloud = `Die Reisezeit beträgt durchschnittlich ${time.getHours()} ${timeHourSuf(time.getHours())}, ${time.getMinutes()} ${timeMinSuf(time.getMinutes())}.
            Bei der aktuellen Verkehrslage benötigst du ${timeTraffic.getHours()} ${timeHourSuf(timeTraffic.getHours())}, ${timeTraffic.getMinutes()} ${timeMinSuf(timeTraffic.getMinutes())}.
            Die Entfernung beträgt ${data["travelDistance"].toString().replace(".", ",")} Kilometer`;
 
          Meteor.call("synthesiseText", stringToReadAloud, (err, res) => {
            if (err) console.error(err)
    
            const blob = new Blob([res], { type: "audio/wav" });
            const url = window.URL.createObjectURL(blob);
    
            document.getElementById("audio").src = url;
            document.getElementById("audio").play();
          });
        }).catch(e => {
          console.error(e);
        });
      }
    }

    const fetchSettings = () => {
      fetch('https://api.nospread.xyz/yapa/v1/user', {
        method: "GET",
        headers: {
          "X-API-KEY": this.props.api
          // "Content-Type": "application/json"
        },
      }).then(res => {
        if(res.status == "200") {
          return res.json();   
        } else {
          console.log(res); 
        }        
      }).then(function(data) {
        getPathData(data);
      }).catch(e => {
        console.error(e);
      });
    }

    const backgroundStyle = {
      backgroundColor: "#FFF",
      height: "100%",
      width: "100%"
    };

    return (
      <div id="path" style={backgroundStyle} onLoad={fetchSettings()}>
      </div>
    );
  }
};

export default Path;
