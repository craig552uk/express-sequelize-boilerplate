#!/usr/bin/node

/**
 * Create a record in the database
 * Specify model name and attributes as CLI arguments
 *
 * ./bin/find_model.js --model=User --name="Jim Jones"
*/

// Get CLI args
var args = require('aargs');

// Disable logging
require('../config').logger.level = 100;

// Find records
var model = require('../models')[args.model]

// Remove known non-filter keys
delete args[0];
delete args[1];
delete args.model;

// Find matching records
model.findAll({where:args})
.then(items => items.map(i =>  i.get()))
.then(items => console.log(items))
.catch(err => console.error(err))