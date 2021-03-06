/**
 * Container for the admin view where we control and manage image data
 */
// import React from 'react';
import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { Loading } from '../components/loading.js';
import { Images } from '../../api/images/images.js';
import { ImageFiles } from '../../api/imageFiles/imageFiles';
import { Places } from '../../api/places/places.js';
import AdminListWrapper from '../components/AdminListWrapper';

/**
 * Provide data for the list of places and images
 */
const composer = (props, onData) => {
  // Create a subscription of places and images
  const subscription = Meteor.subscribe('placesImages');
  if (subscription.ready()) {
    const places = Places.find({}).fetch();
    const images = Images.find({}).fetch();
    const imageFiles = ImageFiles.find({}).fetch();
    onData(null, { places, images, imageFiles });
  }
};

export default composeWithTracker(composer, Loading)(AdminListWrapper);
