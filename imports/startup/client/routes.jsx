import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from '/imports/ui/App.jsx';
import { Test } from '/imports/ui/Test.jsx';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Router path="/" component={ App } />
      <Router path="/test" component={ Test } />
    </Router>,
    document.getElementById('render-target')
  );
});
