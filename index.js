var args   = require('aargs')
var logger = require('./lib/logger')
var app    = require('./lib/app')

// Arguments from CLI
var PORT = args.port || 1337
var HOST = args.host || '127.0.0.1'

// Start server
app.listen(PORT, HOST, () => {
    logger.info(`Listening on http://${HOST}:${PORT}`)
})