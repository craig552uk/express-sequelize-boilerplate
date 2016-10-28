var app = require('supertest')(require('../lib/app'))

describe('Home Routes', () => {

    describe('GET /redir', () => {
        it('should return redirect response', done => {
            app.get('/redir')
            .expect(301)
            .expect('Location', 'https://google.com')
            .end((err, res) => err ? done(err) : done())
        })
    })

    describe('GET /ping', () => {
        it('should return HTML response', done => {
            app.get('/ping')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect("♥ pong ♥")
            .end((err, res) => err ? done(err) : done())
        })
    })

    describe('GET /teapot', () => {
        it('should return jsonp 418 error response', done => {
            app.get('/teapot')
            .expect(418)
            .expect('Content-Type', /json/)
            .expect({"errors":[{"status":418,"title":"I'm a teapot"}]})
            .end((err, res) => err ? done(err) : done())
        })
    })

    describe('GET /error', () => {
        it('should return jsonp 500 error response', done => {
            app.get('/error')
            .expect(500)
            .expect('Content-Type', /json/)
            .expect({"errors":[{"status":500,"title":"Internal Server Error"}]})
            .end((err, res) => err ? done(err) : done())
        })
    })

    describe('GET /notfound', () => {
        it('should return jsonp 404 error response', done => {
            app.get('/notfound')
            .expect(404)
            .expect('Content-Type', /json/)
            .expect({"errors":[{"status":404,"title":"Not Found"}]})
            .end((err, res) => err ? done(err) : done())
        })
    })
})