import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';

Meteor.startup(() => { 
  render(<App/>, document.getElementById('react-target'));

  // Ready Audio
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    console.log(navigator.device.capture);
  }
});
