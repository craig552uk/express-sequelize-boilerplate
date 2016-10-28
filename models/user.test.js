var models = require('.');
var assert = require('assert');
var faker  = require('faker');

describe('User Model', () => {

    describe('Schema', () => {
        var user;

        before(done => {
            models.User.create({name: faker.name.findName()})
            .then(u => {user = u})
            .then(done, done)
        })

        it('should have a name field', () => {
            assert.ok('name' in user)
            assert.equal(typeof user.name, 'string')
        })
    })
})