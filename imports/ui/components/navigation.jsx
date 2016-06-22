import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
  <ul>
    <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
    <li><IndexLink to="/one" activeClassName="active">Page one</IndexLink></li>
    <li><IndexLink to="/two" activeClassName="active">Page two</IndexLink></li>
  </ul>
);
