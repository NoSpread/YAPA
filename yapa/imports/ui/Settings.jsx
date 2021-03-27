import React, { Component } from 'react';

class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const changeViewFromSettings = () => {
            document.getElementById('changeViewButton').click();
        }

        return (
            <div className="container">
                <div className="row gutters">
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                    <h5 className="user-name">Einstellungen</h5>
                                    <br/>
                                    <br/>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Persönliche Informationen</h6>
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
                                            <input type="text" className="form-control" id="streetHome" placeholder="Straße und Hausnummer eingeben"/>
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
                                            <input type="text" className="form-control" id="zipHome" placeholder="Postleitzahl eingeben"/>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="streetWork">Straße und Hausnummer (Arbeitsplatz)</label>
                                            <input type="text" className="form-control" id="streetWork" placeholder="Straße und Hausnummer eingeben"/>
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
                                            <input type="text" className="form-control" id="zipWork" placeholder="Postleitzahl eingeben"/>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <br/>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Assistent</h6>
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
                                                <option value="foot">Zu Fuß</option>
                                                <option value="bicycle">Fahrrad</option>
                                                <option value="publicTransport">ÖPNV</option>
                                                <option value="car">Auto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="jokeQuality">Witzqualität</label>
                                            <select  className="form-control" id="jokeQuality" name="jokeQuality">
                                                <option value="flatJoke">Flachwitz</option>
                                                <option value="dadJoke">Vaterwitz</option>
                                                <option value="ok">Ok</option>
                                                <option value="nsfw">NSFW</option>
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
                                                <option value="voice4">Stimme 4 (UwU)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-secondary" onClick={changeViewFromSettings}>Cancel</button>
                                            <button type="button" id="submit" name="submit" className="btn btn-primary" onClick={changeViewFromSettings}>Update</button>
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