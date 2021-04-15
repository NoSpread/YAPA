import React, { Component } from 'react';

class Stocks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fetchSettings = () => {
      fetch(`${Meteor.settings.public.endpoint}/user`, {
        method: "GET",
        headers: {
          "X-API-KEY": this.props.api
          // "Content-Type": "application/json"
        },
      }).then(res => {
        if(res.status == "200")
          return res.json();                   
      }).then(function(data) {
        displayStocks(data);
      }).catch(e => {
        console.error(e);
      });
    }

    const getStockData = (stockName) => {
      // Stock name must be stock symbol
      fetch(`${Meteor.settings.public.endpoint}/stock`, {
        method: "POST",
        headers: {
          "X-API-KEY": this.props.api,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `symbol=${stockName}`
      }).then(res => {
        if(res.status == "200") {
          return res.json();  
        }              
      }).then(function(data) {
        document.getElementById("stocks").innerHTML = 
          `<p><b>Informationen zum Symbol ${stockName}</b><p/>
          <p>Aktuell: ${String(data["c"]).replace(".",",")}</p>
          <p>Tageshoch: ${String(data["h"]).replace(".",",")}</p>
          <p>Tagestief: ${String(data["l"]).replace(".",",")}</p>
          <p>Eröffnung: ${String(data["o"]).replace(".",",")}</p>
          <p>Vortag: ${String(data["pc"]).replace(".",",")}</p>`;

          const speechText = `Das Symbol ${stockName} ist derzeit bei ${String(data["c"]).replace(".",",")} G E. Das Tageshoch war bei ${String(data["h"]).replace(".",",")} G E.`

          Meteor.call("synthesiseText", speechText, (err, res) => {
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

    const displayStocks = (data) => {
      // Display Error, if user hasn't chosen stocks 
      if(data["stocks"] == "") {
        document.getElementById("conversation").display = "block";
        document.getElementById("chat-content").innerHTML += 
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
            color: #9b9b9b">You don't have stocks selected</p>
          </div>
        </div>`;
      } else {
        //  document.getElementById("stocks").innerHTML =
        //    `<iframe src="https://widget.finnhub.io/widgets/stocks/chart?symbol=${data["stocks"]}&textColor=black"></iframe>`;     
        
        // Alternative
        getStockData(data["stocks"]);
      }
    }

    const backgroundStyle = {
      backgroundColor: "#FFF",
      height: "100%",
      width: "100%"
    };

    return (
      <div id="stocks" style={backgroundStyle} onLoad={fetchSettings()}>
      </div>
    );
  }
};

export default Stocks;
