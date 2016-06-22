import '/imports/startup/client';
import { Meteor } from 'meteor/meteor';
import React  from 'react';
import { render } from 'react-dom';
import '../imports/startup/accounts-config.js';
import App  from '../imports/ui/App.jsx';
import './main.html';

//
// Meteor.startup(() => {
//   render(<App />, document.getElementById('render-target'));
// });
