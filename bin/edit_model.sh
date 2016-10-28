#!/usr/bin/node

/**
 * Create a record in the database
 * Specify model name and attributes as CLI arguments
 *
 * npm run add:record --model=User --name="Jim Jones"
*/

// Get CLI args
var args = require('aargs');

// Disable logging
require('../config').logger.level = 100;

// Find records
var model = require('../models')[args.model];

// Update record
model.update(args, {where: {id: args.id || 0}})
.then(rows => {
    console.log("Rows affected "+rows)
    return rows > 0 ? model.findById(args.id).then(item => console.log(item.get())) : undefined
}).catch(err => console.error(err))