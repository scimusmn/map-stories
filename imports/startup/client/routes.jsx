import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListPlacesContainer from '../../ui/containers/ListPlacesContainer.jsx';
import PlaceContainer from '../../ui/containers/PlaceContainer.jsx';

import { App } from '../../ui/layouts/App.jsx';
import { Index } from '../../ui/components/index.jsx';

import { Place } from '../../ui/pages/place.jsx';
import { NotFound } from '../../ui/components/notFound.jsx';
import ListPlaces from '../../ui/components/ListPlaces.jsx';

export const renderRoutes = () => (
  <Router history={ browserHistory }>
    <Route path="/" component={ AppContainer }>
      <IndexRoute component={ ListPlacesContainer } />
      <Route path="/place/:slug" component={ PlaceContainer } />
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
);
