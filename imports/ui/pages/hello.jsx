import React from 'react';

export const Hello = ({ params, place }) => (
  <h3>Howdy, {params.name}! You like {place.query.food}.</h3>
);
