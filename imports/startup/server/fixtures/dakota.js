import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Dakota from '/imports/api/dakota/dakota';

if (Dakota.find().count() === 0) {

  console.log('Loading Dakota data');

  const data = [
    // Mendota
    {
      lat: 44.885965,
      long: -93.162233,
      place: 'Mendota',
      englishPlaceName: 'Mendota',
      dakotaPlaceName: 'Bdote',
      nameFilename: 'mendota-name.mp4',
      explainFilename: 'mendota-explain.mp4',
      description: 'Bdote, and that means the throat of the waters. And so, ' +
      'Mendota was named after Bdote as kind of a mispronunciation of Bdote.',
      offsetX: -100,
      offsetY: -200,
    },

    {
      lat: 44.805654,
      long: -93.220164,
      place: 'Mendota',
      englishPlaceName: 'Black Dog\'s village',
      dakotaPlaceName: 'Śunkasapa',
      nameFilename: 'black-dog-name.mp4',
      explainFilename: 'black-dog-explain.mp4',
      description: 'Śunkasapa means Black Dog, which is Black Dog\'s ' +
      'Village. Out by where the Black Dog power station is, in Bloomington. ' +
      'One the things about Black Dog\'s Village is, they had a name ' +
      'Ma¥ayuteßni, they don\'t eat geese, because they used to hunt geese'  +
      'and sell the geese to the Fort.',
      offsetX: 0,
      offsetY: 0,
    },

    {
      lat: 44.844824,
      long: -93.170841,
      place: 'Mendota',
      englishPlaceName: 'Pilot Knob',
      dakotaPlaceName: 'Oheyawahi',
      nameFilename: 'pilot-knob-name.mp4',
      explainFilename: 'pilot-knob-explain.mp4',
      description: 'Oheyawahi is Pilot Knob, the translation would be "to be ' +
      'victorious." Around Pilot Knob there was a lot of vision pits. ' +
      'And so that could be why it would be called Oheyawahi or "to be ' +
      'victorious."',
      offsetX: 0,
      offsetY: 0,
    },

    // Saint Paul
    {
      lat: 44.955019,
      long: -93.096303,
      place: 'Saint Paul',
      englishPlaceName: 'Saint Paul',
      dakotaPlaceName: 'Imniżaska',
      nameFilename: 'saint-paul-name.mp4',
      explainFilename: 'saint-paul-explained.mp4',
      description: 'Imniżaska is where the present city of Saint Paul is. And ' +
      'Imniżaska means the "white bluffs."',
      offsetX: 0,
      offsetY: 0,
    },

    // SAF
    {
      lat: 44.980559,
      long: -93.253200,
      place: 'Saint Anthony Falls',
      englishPlaceName: 'Spirit Island',
      dakotaPlaceName: 'Wanaġi Wita',
      nameFilename: 'spirit-island-name.mp4',
      explainFilename: 'spirit-island-explained.mp4',
      description: 'Wanaġi Wita is Spirit Island. Wanaġi is the spirit and ' +
      'of course Wita is an island.',
      offsetX: 0,
      offsetY: 0,
    },

    {
      lat: 44.982077,
      long: -93.257285,
      place: 'Saint Anthony Falls',
      englishPlaceName: 'Saint Anthony Falls',
      dakotaPlaceName: 'Owamni Yemini',
      nameFilename: 'saint-anthony-name.mp4',
      explainFilename: 'saint-anthony-explained.mp4',
      description: 'Owamni Yemini. That\'s at Saint Anthony Falls and it\'s a ' +
      'description of the falls. It\'s a big falls and it\'s all around. ' +
      'So Owamni Yemini is a description of Saint Anthony Falls',
      offsetX: 0,
      offsetY: 0,
    },

    {
      lat: 44.987637,
      long: -93.262887,
      place: 'Saint Anthony Falls',
      englishPlaceName: 'Nicollet Island',
      dakotaPlaceName: 'Wita Waṡte',
      nameFilename: 'nicollet-island-name.mp4',
      explainFilename: 'nicollet-island-explained.mp4',
      description: 'Wita Waṡte is Nicollet Island. And what it translates to ' +
      'is Wita is island and Waṡte is good. So it translates to "good island."',
      offsetX: 0,
      offsetY: 0,
    },

    //  Mounds
    {
      lat: 44.944700,
      long: -93.049,
      place: 'Mounds Park',
      englishPlaceName: 'Little Crow’s Village',
      dakotaPlaceName: 'Kapoża',
      nameFilename: 'little-crow-name.mp4',
      explainFilename: 'little-crow-explained.mp4',
      description: 'Kapoża was Little Crow\'s village, but Kapoża means, "this is the band." ' +
      'They were the ones who traveled lightly, they don\'t carry a bunch of baggage with them ' +
      'when they move. So they were called Kapoża.',
      offsetX: 0,
      offsetY: 0,
    },

    {
      lat: 44.945849,
      long: -93.059995,
      place: 'Mounds Park',
      englishPlaceName: 'Carver’s Cave',
      dakotaPlaceName: 'Wankan Tipi',
      nameFilename: 'carvers-cave-name.mp4',
      explainFilename: 'carvers-cave-explained.mp4',
      description: 'Wankan Tipi is a mysterious dwelling. Tipi meaning dwelling, ' +
      'and Wankan is mysterious. It gets its name from the petroglyphs found inside ' +
      'of Carver\'s Cave. So the translation has nothing to do with Carver, just the cave. ' +
      'And it\'s Wankan Tipi, the mysterious house, or where the mysterious lives.',
      offsetX: 0,
      offsetY: 0,
    },

    // Hastings
    {
      lat: 44.735451,
      long: -92.75,
      place: 'Hastings',
      englishPlaceName: 'Saint Croix River',
      dakotaPlaceName: 'Okizuwakpa',
      nameFilename: 'saint-croix-name.mp4',
      explainFilename: 'saint-croix-explained.mp4',
      description: 'Okizuwakpa is again, the meeting of two rivers. The Saint Croix ' +
      'River as it drains into the Mississippi River. The one story concerning the ' +
      'Saint Croix river in that area is the myth, or the story of the fishwoman, ' +
      'the woman who turned into a fish. And that happened around the Saint Croix River.',
      offsetX: 0,
      offsetY: 0,
    },

    // Fort Snelling
    {
      lat: 44.892710,
      long: -93.180679,
      place: 'Fort Snelling',
      englishPlaceName: 'Fort Snelling',
      dakotaPlaceName: 'Ḣaḣobdote',
      nameFilename: 'fort-snelling-name.mp4',
      explainFilename: 'fort-snelling-explain.mp4',
      description: 'Ḣaḣobdote is the throat of the rapids, which is below Fort Snelling.',
      offsetX: 0,
      offsetY: 0,
    },

    {
      lat: 44.892120,
      long: -93.166090,
      place: 'Fort Snelling',
      englishPlaceName: 'Pike Island',
      dakotaPlaceName: 'Wita Tanka',
      nameFilename: 'pike-island-name.mp4',
      explainFilename: 'pike-island-explained.mp4',
      description: 'Wita Tanka. Wita is an island and Tanka is big. ' +
      'So Pike Island therefore in a Dakota translation would be the "big island."',
      offsetX: 0,
      offsetY: 0,
    },

    {
      lat: 44.812659,
      long: -93.231071,
      place: 'Fort Snelling',
      englishPlaceName: 'Minnesota River',
      dakotaPlaceName: 'Wakpa Minisota',
      nameFilename: 'minnesota-river-name.mp4',
      explainFilename: 'minnesota-river-explained.mp4',
      description: 'Wakpa Minisota, the Minnesota River. Minisota is the kind of ' +
      'the "reflection of the skies river." So if the sky was blue, well then the river ' +
      'would have a blue tint to it and if the sky was grey it would have a ' +
      'grey tint to it.',
      offsetX: 0,
      offsetY: 0,
    },

    {
      lat: 44.897746,
      long: -93.12,
      place: 'Fort Snelling',
      englishPlaceName: 'Meeting of the Rivers',
      dakotaPlaceName: 'Okiżu wakpa',
      nameFilename: 'meeting-rivers-name.mp4',
      explainFilename: 'meeting-rivers-explained.mp4',
      description: 'Okiżu wakpa is the confluence of the Mississippi and the ' +
      'Minnesota Rivers. The creation myth of the Mdewakantonwan is that this is where the Dakota ' +
      'first appeared on Earth as human beings. They descended from the seven fires, or the seven ' +
      'stars of the Plieades and arrived at the confluence of the MIssissippi and Minnesota river, where ' +
      'they became Dakota. And the irony about that, is that it\'s the same island where the Dakota people ' +
      'were held captive after the war of 1862.',
      offsetX: 0,
      offsetY: 0,
    },

  ];

  // Insert the data with a slug
  data.forEach((dakota) => {
    const mutatedDakota = dakota;
    mutatedDakota.slug = _.kebabCase(`${dakota.place}-${dakota.englishPlaceName}`);
    Dakota.insert(mutatedDakota);
  });
}
