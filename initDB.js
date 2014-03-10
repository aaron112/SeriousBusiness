
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');
var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var total_tables = 3;
var local_database_name = 'sb';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var data_json = require('./data.json');
var tablecount = 0;


// Step 2: Remove all existing documents
models.Routes
  .find()
  .remove()
  .exec(onceClear); // callback to continue at

models.Busstops
  .find()
  .remove()
  .exec(onceClear); // callback to continue at

models.Schedule
  .find()
  .remove()
  .exec(onceClear); // callback to continue at

models.Reservations
  .find()
  .remove()
  .exec(onceClear); // callback to continue at


// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);

  tablecount++;

  if ( tablecount < total_tables )
    return;

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...


  tablecount = 0;

  saveTable(models.Routes, 'Routes');
  saveTable(models.Busstops, 'Busstops');
  saveTable(models.Schedule, 'Schedule');
}


function saveTable(model, datakey) {
  var data = data_json[datakey];
  var to_save_count = data.length;


  for(var i=0; i<data.length; i++) {
    var json = data[i];
    var proj = new model(json);

    proj.save(function (err, proj) {
      if(err) console.log(err);

      to_save_count--;
      console.log('['+datakey+'] '+to_save_count + ' left to save');

      if (to_save_count <= 0) {
        tablecount++;

        console.log('table '+datakey+' DONE');

        if ( tablecount >= total_tables ) {
          console.log('DONE');
          // The script won't terminate until the 
          // connection to the database is closed
          mongoose.connection.close();
        }
      }

    });
  }
}
