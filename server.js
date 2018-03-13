require('dotenv').config();

const PORT        = process.env.PORT || 3001;
const ENV         = process.env.ENV || 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const seeder = require('knex-csv-seeder');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

// Retrieve the lat and lng from Google Maps API
// Insert into 'projects' table
const API_KEY = 'AIzaSyCVUNahj_Lx06vet-sGaPLHBs0svgXwX98';
const axios = require('axios');
knex('projects')
  .select('id', 'address', 'city', 'province')
  .returning()
  .then(data => {
    data.forEach(project => {
      console.log(project);
      console.log(project.id);
      let address = (`${project.address}, ${project.city}, ${project.province}`).split(' ').join('+');
      // console.log(address);
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(response => {
          let lat = response.data.results[0].geometry.location.lat;
          let lng = response.data.results[0].geometry.location.lng;
          console.log(lat, lng, project.id);
          knex('projects')
            .where('id', project.id)
            .update({ lat: lat, lng: lng })
            .returning('*')
            .then(data => console.log(data));
        })
        .catch(error => {
          console.log(error);
        });
    });
  });

// Return some details of all projects
app.get('/api', (req, res) => {

  console.log('Trying to get /api');

    knex('projects')
    .select('name', 'address', 'city', 'province', 'certification_level_id')
    .returning()
    .then(result => res.json({ result }));
});

// TODO: test foreign key entries
app.post('/api', (req, res) => {
  console.log('Trying to post to /api');

  const newProject = req.body.project;
  console.log(req.body);
  console.log(newProject);
  // const setForeignKey = (tableName, columnName) => {
  //   const singularTableName = tableName.slice(-1);
  //   if (newProject.singularTableName) {
  //     const foreignKeyColumnName = singularTableName + '_id';
  //     const id = knex(tableName).select('id').where(columnName, newProject.singularTableName);
  //     knex('projects').insert({ foreignKeyColumnName: id });
  //   }
  // }

  knex('projects')
  .insert({ number: newProject.number, name: newProject.name, address: newProject.address, city: newProject.city, province: newProject.province, size: newProject.size })
  .returning('id')
  .then((result) => {
    const id = result[0];
    if (newProject.reg_date) { knex('projects').insert({ reg_date: newProject.reg_date }).where('id', id) };
    if (newProject.reg_date) { knex('projects').insert({ reg_date: newProject.reg_date }).where('id', id) };
    if (newProject.project_type) {
      const project_type_id = knex('project_types').select('id').where('type', newProject.project_type);
      knex('projects').insert({ project_type_id: project_type_id[0] }).where('id', id);}
    if (newProject.owner_type) {
      const owner_type_id = knex('owner_types').select('id').where('type', newProject.owner_type);
      knex('projects').insert({ owner_type_id: owner_type_id[0] }).where('id', id);}
    if (newProject.certification_level) {
      const certification_level_id = knex('certification-levels').select('id').where('level', newProject.certification_level);
      knex('projects').insert({ certification_level_id: certification_level_id[0] }).where('id', id);}
    if (newProject.rating_system && newProject.version) {
      const rating_system_id = knex('rating_systems').select('id').where({ rating_system: newProject.rating_system, version: newProject.version });
      knex('projects').insert({ project_type_id: project_type_id[0] }).where('id', id);}
    return id;
  })
  .then(() => res.json({ message: 'success' }));
});

// Return details of a partical project
app.get('/api/:id', (req, res) => {
  console.log('Trying to get /api/:id');

  // Select the project with matching id
  const id = req.params.id;
  knex('projects')
  .select()
  .leftJoin('project_types', 'projects.project_type_id', '=', 'project_types.id')
  .leftJoin('owner_types', 'projects.owner_type_id', '=', 'owner_types.id')
  .leftJoin('certification_levels', 'projects.certification_level_id', '=', 'certification_levels.id')
  .leftJoin('rating_systems', 'projects.rating_system_id', '=', 'rating_systems.id')
  .where('projects.id', id)
  .returning()
  .then(result => res.json({ result }));

});

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});

// knex('projects')
//   .insert({ number: 345, name: 'Emily', address: '905 41 St SW', city: 'Calgary', province: 'Alberta', size: 123 })
//   .returning('id')
//   .then(id => console.log(id));


