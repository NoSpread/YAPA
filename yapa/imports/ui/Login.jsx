import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            api: ""
        };
    }

    render() {
        // To Change between Login, Dashboard & Settings
        const changeViewFunction = () => {
            document.getElementById("changeViewInput").value = "dashboard";
            document.getElementById("changeViewInput").click();
        }    

        const register = (event) => {
            event.preventDefault();

            var loginInput = document.getElementById("login");
            var passwordInput = document.getElementById("password");
            
            fetch(process.env.ENDPOINT + '/user/register', {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${loginInput.value}&password=${passwordInput.value}`
            }).then(res => {
                if(res.status == "201") {                   
                    login(event);
                } else {
                    document.getElementById("warning").textContent = "Fehler bei der Registrierung";
                }
            }).catch(e => {
                console.error(e);
            });      
        }

        const fetchSettings = (apiKey) => {
            return new Promise((resolve, reject) => {
              fetch(process.env.ENDPOINT + '/user', {
                method: "GET",
                headers: {
                  "X-API-KEY": apiKey
                  // "Content-Type": "application/json"
                },
              }).then(res => {
                if(res.status == "200") {
                  return res.json();   
                } else {
                  console.log(res); 
                  return null;
                }        
              }).then(function(data) {
                resolve(data)
              }).catch(e => {
                console.error(e);
                reject(error)
              });
            })
          }
      
          const welcome = (apiKey) => {
            fetchSettings(apiKey)
            .then(data => {
                var welcomeString = "";
                if ( data == null ) {
                    welcomeString = `Guten Morgen. Wie kann ich dir heute behilflich sein?`;
                } else {
                    welcomeString = `Guten Morgen ${data.fullname}. Wie kann ich dir heute behilflich sein?`;
                }
              
              Meteor.call("synthesiseText", welcomeString, (err, res) => {
                if (err) console.error(err)
        
                const blob = new Blob([res], { type: "audio/wav" });
                const url = window.URL.createObjectURL(blob);
        
                document.getElementById("audio").src = url;
                document.getElementById("audio").play();
              });
            }).catch(e => {
              console.log(e);
            });
          }
    
        const login = (event) => {
            event.preventDefault();

            var loginInput = document.getElementById("login");
            var passwordInput = document.getElementById("password");
    
            fetch(process.env.ENDPOINT + '/user/login', {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${loginInput.value}&password=${passwordInput.value}`
            }).then(res => {
                if(res.status == "200") {
                    return res.json();                 
                } else if (res.status == "400") {
                    document.getElementById("warning").textContent = "Eingabe unvollständig";
                } else {
                    document.getElementById("warning").textContent = "Anmeldung fehlgeschlagen";
                }
            }).then(function(data) {
                welcome(data.api);
                document.getElementById("setApi").value = data.api;
                document.getElementById("setApi").click();

                document.getElementById("setId").value = data.id;
                document.getElementById("setId").click();

                changeViewFunction();
            }).catch(e => {
                console.error(e);
            });   
        }


        return (
            <div style={{paddingTop: "10vh"}}>
                <div className="panel panel-default align-middle">
                    <div className="panel-heading">{this.state.register ? "Registrierung" : "Anmeldung"}</div>
                    <div className="panel-body">
                        <p className="text-warning text-center" id="warning"></p>
                        <form>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <span className="input-group-text"> <i className="glyphicon glyphicon-user"></i> </span>
                                    </div>
                                    <input className="form-control" type="text" id="login" placeholder="Nutzername"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon">
                                        <span className="input-group-text"> <i className="glyphicon glyphicon-lock"></i> </span>
                                    </div>
                                    <input className="form-control" type="password" id="password" placeholder="Passwort"/>
                                </div>
                            </div>


                            <div className="form-group">
                                {this.state.register? 
                                    <input className="btn btn-primary btn-block" type="submit" onClick={e => register(e)} value="Registrieren"/> : 
                                    <input className="btn btn-primary btn-block" type="submit" onClick={e => login(e)} value="Anmelden"/>
                                }
                            </div>
                        </form>
                    </div>
                    <div className="panel-footer">
                        {this.state.register? 
                            <a className="btn btn-link" onClick={() => this.setState({register: !this.state.register})}>
                                Ich habe schon einen Account.
                            </a> : 
                            <a className="btn btn-link" onClick={() => this.setState({register: !this.state.register})}>
                                Ich habe noch keinen Account.
                            </a>
                        }
                    </div>
                </div>
            </div>
        );
    } 
};

export default Login;
