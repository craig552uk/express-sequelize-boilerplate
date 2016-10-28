var HTTPError = require('http-errors');
var router    = require('express').Router();

// 200 response (with unicode)
router.all('/ping/',   (req, res) => res.send('♥ pong ♥'));

// Redirect response
router.all('/redir/',  (req, res) => res.redirect(301, 'https://google.com'));

// Thrown Error response
router.all('/error/',  (req, res) => { throw Error("Oh Crap!")});

// HTTP Error response
router.all('/teapot/', (req, res) => res.jsonp(HTTPError.ImATeapot()));

// JSON response
router.all('/hello/',  (req, res) => res.jsonp("😃 Hello API! 😃") );

module.exports = router;