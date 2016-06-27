import React from 'react';
import { Link } from 'react-router';
import { Loading } from '../../ui/components/loading.js';

const renderPlace = (places) => (
  <div>
    {places.name}
  </div>
);

export const SinglePlace = ({ places }) => (
  places.length > 0 ? <div className="documents-list">
    {places.map((place) => (
      <div key={ place._id }>{place.name}</div>
    ))}
  </div> :
  <div>No places yet.</div>
);
