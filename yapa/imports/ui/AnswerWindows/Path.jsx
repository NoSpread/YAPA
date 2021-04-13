import React, { Component } from 'react';

class Path extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const getPathData = (data) => {
      if(data["movement_type"] == "") {
        document.getElementById("conversation").style.display = "block";
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
            color: #9b9b9b">You don't have movement type selected</p>
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
          var timeString = time.toISOString().substr(11, 8);

          document.getElementById("path").innerHTML = 
            `<p>Reisedauer: ${timeString} h</p>
            <p>Reisedauer bei Stau: ${data["travelDurationTraffic"]}</p>
            <p>Entfernung: ${data["travelDistance"]} km</p>`;
          console.log(data);
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
        if(res.status == "200")
          return res.json();                   
      }).then(function(data) {
        getPathData(data);
      }).catch(e => {
        console.error(e);
      });
    }

    const backgroundStyle = {
      backgroundColor: "#FAFAFA",
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