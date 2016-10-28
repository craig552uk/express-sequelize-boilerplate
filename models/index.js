'use strict'

var fs        = require('fs')
var path      = require('path')
var Sequelize = require('sequelize')
var config    = require('../config').database
var logger    = require('../lib/logger')
var models    = {}

// Use logger for SQL queries
config.logging = function(msg){ logger.debug(msg) }

config.pool = {
    maxConnections: 5,
    minConnections: 0,
    maxIdleTime:    1000.
}

config.define = {
    underscored: true,
    instanceMethods: {},
    classMethods: {},
}

// Support loading DB connection form system variable
if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0)                 // No hidden files
        && (file.indexOf('.test.js') < 0)            // No test files
        && (file !== path.basename(module.filename)) // Exclude directory
        && (file.slice(-3) === '.js')                // Must be JS
}).forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file))
    models[model.name] = model
})

// Create model associations
Object.keys(models).forEach(function(modelName) {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models