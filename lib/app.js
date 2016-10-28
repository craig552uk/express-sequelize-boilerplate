var HTTPError = require('http-errors')
var parser    = require('body-parser')
var express   = require('express')
var logger    = require('./logger')

// ---------- //
// Middleware //
// ---------- //

var app = express()

// Parse JSON requests
app.use(parser.json())

// Wrap jsonp responses in json API format and log
app.use((req, res, next) => {
    var orig_jsonp = res.jsonp
    res.jsonp = function(obj){

        if(obj instanceof Error){
            res.status(obj.statusCode || 500)
            var body = {errors: [{status: res.statusCode, title: obj.message}]}
        }else{
            var body = {data: obj}
        }

        orig_jsonp.call(this, body)
        logger.info({request: req.body, response: body}, `${res.statusCode} ${req.method} ${req.url}`)
    }
    next()
});


// ------ //
// Routes //
// ------ //

// Fetch and apply routes to app
app = require('../routes')(app);


// -------------- //
// Error Handlers //
// -------------- //

// 404
app.use((req, res, next) => {
    res.jsonp(HTTPError.NotFound())
})

// 500
app.use((err, req, res, next) => {
    logger.error({error: err}, err.stack);
    switch(err.type || err.name){
        case 'SequelizeValidationError': 
        case 'SequelizeExclusionConstraintError': 
        case 'SequelizeUniqueConstraintError': 
            res.jsonp(HTTPError.BadRequest(err.message)); break;
        case 'SequelizeForeignKeyConstraintError': 
            res.jsonp(HTTPError.NotFound()); break;
        default:
            res.jsonp(HTTPError.InternalServerError());
    }
})

module.exports = app