import React, { Component } from 'react';
import '../style/login.css';

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
            
            fetch('https://api.nospread.xyz/yapa/v1/user/register', {
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
                    document.getElementById("main").innerHTML = `<div class="alert alert-warning alert-dismissible">
                    <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Warnung!</strong> Nutzer konnte leider nicht erstellt werden.
                  </div>${document.getElementById("main").innerHTML}`;
                }
            }).catch(e => {
                console.error(e);
            });      
        }
    
        const login = (event) => {
            event.preventDefault();

            var loginInput = document.getElementById("login");
            var passwordInput = document.getElementById("password");
    
            fetch('https://api.nospread.xyz/yapa/v1/user/login', {
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
                    document.getElementById("main").innerHTML = `<div class="alert alert-warning alert-dismissible">
                    <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Warnung!</strong> Nutzername oder Passwort fehlt.
                  </div>${document.getElementById("main").innerHTML}`;
                } else {
                    document.getElementById("main").innerHTML = `<div class="alert alert-warning alert-dismissible">
                    <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <strong>Warnung!</strong> Nutzer konnte nicht gefunden werden.
                  </div>${document.getElementById("main").innerHTML}`;
                }
            }).then(function(data) {
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
            <div id="formContent">
                <form>
                    <input type="text" id="login" name="login" placeholder="Nutzername"/>
                    <input type="password" id="password" name="login" placeholder="Passwort"/>
                    {this.state.register? 
                        <input type="submit" onClick={e => register(e)} value="Registrieren"/> : 
                        <input type="submit" onClick={e => login(e)} value="Anmelden"/>
                    }
                    {/* <input type="button" onClick={this.props.handleStateChange("loginapi")} value="API Senden"/> */}
                </form>
                <div id="formFooter">
                    {this.state.register? 
                        <a className="underlineHover" onClick={() => this.setState({register: !this.state.register})}>Anmelden</a> : 
                        <a className="underlineHover" onClick={() => this.setState({register: !this.state.register})}>Registrieren</a>
                    }
                </div>
            </div>
        );
    } 
};

export default Login;

// Source of bootstrap https://bootsnipp.com/snippets/dldxB