var bunyan = require('bunyan')
var config = require('../config')

var appName  = config.name || "Boilerplate App"
var logLevel = (config.logger && config.logger.level) ? config.logger.level : "debug"

module.exports = bunyan.createLogger({name: appName, level: logLevel})