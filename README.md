# Follow My LEED
_A comprehensive toolkit to quickly evaluate a location._

### This goal of the this project is to:
- Automate green building certification process
- Solve the time-consuming problem when collecting and filtering data that meet the certification.
- We found that it also very helpful for exploring and visualizing information on a map for many industries and people to quickly evaluate location, eg: real estate, new stores opening, house hunters.

### The main features:
- Let users know the green buildings(LEED certified from official database) around a customized location on a map
- Let users evaluate a customized location by:
  * the number and markers of intersections in a 400m radius
  * the number and markers of transit stops in a 400m radius
  * the number and markers of all serviced in a 800m walking distance
  * draw and calculate a area on the map, eg: green open space
- Users can easily swith between two features or make a new search in the nav bar

### Future features:
- Fix bugs in marker clusters hide/show
- Create a breakdown table for services, different icons for different services
- Url sharing with place ID

## Pre-Install Tech Requirements
- PostgreSQL
- Node
- NPM

## Instructions

### Installing dependencies

```$ npm install```

### Seeding & Creating the database

1. ```$ knex seed:run```
2. manually run this file:
```$ node  ./db/seed_file_to_be_ran_manually/5_projects_lat_lng_seed.js```

Note: This file cannot be run with `$ knex seed:run` because it makes http requests.

### Running the Servers

* running the client server from root directory:
`$ cd react-server`
`$ npm start`

* running the backend server from root directory:
`$ npm start`
