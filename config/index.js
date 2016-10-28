var package = require('../package.json')

// Get configuration object for the current environment
var env  = process.env.NODE_ENV || 'development'
var conf = require(`./${env}.json`)

// Inject dynamic attributes
conf.environment = env
conf.name        = package.name
conf.version     = package.version
conf.description = package.description
conf.author      = package.author
conf.license     = package.license

module.exports = conf