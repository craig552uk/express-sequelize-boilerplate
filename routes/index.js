'use strict';
var fs   = require('fs');
var path = require('path');

module.exports = function(app){
    fs.readdirSync(__dirname).filter(function(file) {
        return (file.indexOf('.') !== 0)                 // No hidden files
            && (file.indexOf('.test.js') < 0)            // No test files
            && (file !== path.basename(module.filename)) // Exclude directory
            && (file.slice(-3) === '.js');               // Must be JS
    }).forEach(function(file) {
        // Apply routes to app
        // route modules must export an Express Router object
        app.use(require(path.join(__dirname, file)))
    });
    return app;
}