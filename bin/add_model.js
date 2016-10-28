#!/usr/bin/node

/**
 * Create a record in the database
 * Specify model name and attributes as CLI arguments
 *
 * ./bin/add_model.js --model=User --name="Jim Jones"
*/

// Get CLI args
var args = require('aargs');

// Disable logging
require('../config').logger.level = 100;

// Find records
var model = require('../models')[args.model];

// Create record
model.create(args)
.then(item => console.log(item.get()))
.catch(err => console.error(err))