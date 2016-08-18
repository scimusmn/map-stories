# Map stories
A system for displaying stories at various places on a map

## Technology
Developed using Meteor and React

# Install

* Clone the repo
* Add the image in `public/images/collection`
* `cp settings.default.json settings.json`
* Fill out info in the settings.json
* `meteor npm install`
* `meteor reset; meteor --settings settings.json`
* `mongoimport -h 127.0.0.1:3001 --db meteor --collection Images --type json --file public/data/images.json`
