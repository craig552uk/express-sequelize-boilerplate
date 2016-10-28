// Map DB config into format for sequelize-cli migrations
module.exports = {
  "development": require('./development.json').database,
  "production":  require('./production.json').database,
  "test":        require('./test.json').database,
}