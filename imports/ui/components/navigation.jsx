import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
  <ul>
    <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
  </ul>
);
