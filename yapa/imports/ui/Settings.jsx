import React, { Component } from 'react';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // To Change between Login, Dashboard & Settings
        const changeViewFunction = () => {
            document.getElementById("changeViewInput").value = "dashboard";
            document.getElementById("changeViewInput").click();
        }
        const logout = () => {
            document.getElementById("changeViewInput").value = "login";
            document.getElementById("changeViewInput").click();
        }

        const getApi = () => {
            return this.props.api;
        }

        const getId = () => {
            return this.props.id;
        }

        const fetchSettings = () => {
            fetch('https://api.nospread.xyz/yapa/v1/user', {
                method: "GET",
                headers: {
                    "X-API-KEY": getApi()
                    // "Content-Type": "application/json"
                },
            }).then(res => {
                if(res.status == "200") 
                    return res.json();                     
            }).then(function(data) {
				filldata(data);
			}).catch(e => {
                console.error(e);
            });
        }

		const filldata = (data) => {
			// its settings i guess, quite much repetition
			if(data == null) return;
            document.getElementById("name").value = data["fullname"]
			document.getElementById("streetHome").value = data["residenceStreet"]
			document.getElementById("cityHome").value  = data["residenceCity"]
			document.getElementById("zipHome").value = data["residenceCode"]
			document.getElementById("streetWork").value = data["workplaceStreet"]
			document.getElementById("cityWork").value = data["workplaceCity"]
			document.getElementById("zipWork").value = data["workplaceCode"]
			document.getElementById("stocks").value = data["stocks"]
			document.getElementById("plannedWorkTime").value = data["workstart"]
			document.getElementById("assistentVoice").children[data["voice"]].selected= true
			document.getElementById("transportationMode").
				children[["", "walking","transit", "driving"].indexOf(data["movement_type"])].selected = true
            
		}

        const updateSettings = () => {
            // Store new settings in DB 
			console.log("updatesettings ")
			var updatebody = {
				"id": parseInt(getId()),
				"fullname": document.getElementById("name").value,
				"residenceStreet": document.getElementById("streetHome").value,
				"residenceCity": document.getElementById("cityHome").value,
				"residenceCode": document.getElementById("zipHome").value,
				"workplaceStreet": document.getElementById("streetWork").value,
				"workplaceCity": document.getElementById("cityWork").value,
				"workplaceCode": document.getElementById("zipWork").value,
				"stocks": document.getElementById("stocks").value,
				"workstart": document.getElementById("plannedWorkTime").value,
				"voice": parseInt(document.getElementById("assistentVoice").value.slice(-1)),
				"movement_type": document.getElementById("transportationMode").value
			}
            
            Object.keys(updatebody).forEach(key => {
                if(updatebody[key] === "") updatebody[key] = null;
            })

			fetch('https://api.nospread.xyz/yapa/v1/user', {
                method: "PUT",
                headers: {
                    "X-API-KEY": getApi(),
                    //"accept": "application/json",
                    "Content-Type": "application/json"
                },
				body : JSON.stringify(updatebody)
            }).then(res => {
                if(res.status != "200") {
                    document.getElementById("main").innerHTML = `<div class="alert alert-warning alert-dismissible">
                    <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                 	Die Einstellungen konnten nicht aktualisiert werden!
					</div>${document.getElementById("main").innerHTML}`;                  
                }
                changeViewFunction();
            }).catch(e => {
                console.error(e);
            });
        }

        const deleteUser = () => {
			console.log("deleteUser")
            fetch('https://api.nospread.xyz/yapa/v1/user', {
                method: "DELETE",
                headers: {
					"X-API-KEY": getApi(),
                    "accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if(res.status == "200") {
                    return res.json();                     
                } else {
                    return res.json(); 
                }
            }).then(function(data) {
                console.log(JSON.strinigfy(data));
            }).catch(e => {
                console.error(e);
            });          

        }

        return (
            <div className="container" onLoad={fetchSettings()}>
                <div className="row gutters">
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <h1 className="user-name">Einstellungen</h1>
                                    <br/>
                                    <br/>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h2 className="mb-3 text-primary">Persönliche Informationen</h2>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Vorname</label>
                                            <input type="text" className="form-control" id="name" placeholder="Vornamen eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="streetHome">Straße und Hausnummer (Zuhause)</label>
                                            <input type="text" className="form-control" id="streetHome" placeholder="Straße und Haus-Nr. eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="cityHome">Stadt (Zuhause)</label>
                                            <input type="text" className="form-control" id="cityHome" placeholder="Stadt eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="zipHome">Postleitzahl (Zuhause)</label>
                                            <input type="number" className="form-control" id="zipHome" placeholder="Postleitzahl eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="streetWork">Straße und Hausnummer (Arbeitsplatz)</label>
                                            <input type="text" className="form-control" id="streetWork" placeholder="Straße und Haus-Nr. eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="cityWork">Stadt (Arbeitsplatz)</label>
                                            <input type="text" className="form-control" id="cityWork" placeholder="Stadt eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="zipWork">Postleitzahl (Arbeitsplatz)</label>
                                            <input type="number" className="form-control" id="zipWork" placeholder="Postleitzahl eingeben"/>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h2 className="mb-3 text-primary">Assistent-Einstellungen</h2>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="stocks">Aktien</label>
                                            <input type="text" className="form-control" id="stocks" placeholder="Aktien eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="plannedWorkTime">Geplanter Arbeitsbeginn</label>
                                            <input type="time" className="form-control" id="plannedWorkTime"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="transportationMode">Fortbewegungsart</label>
                                            <select  className="form-control" id="transportationMode" name="sTate">
                                                <option value="">Nichts Ausgewählt</option>
                                                <option value="walking">Zu Fuß</option>
                                                <option value="transit">ÖPNV</option>
                                                <option value="driving">Auto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="assistentVoice">Stimme Assistent</label>
                                            <select  className="form-control" id="assistentVoice" name="assistentVoice">
                                                <option value="voice1">Stimme 1 (männlich)</option>
                                                <option value="voice2">Stimme 2 (weiblich)</option>
                                                <option value="voice3">Stimme 3 (Roboter)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-warning" onClick={() => {deleteUser(); logout();}} style={{float: "left"}} >Benutzer löschen</button>
                                            <button type="button" id="submit" name="submit" className="btn btn-warning" onClick={() => changeViewFunction()}>Abbrechen</button>
                                            <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={() => {updateSettings()}}>Änderungen speichern</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
};

export default Settings;
