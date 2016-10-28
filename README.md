Express, Sequelize Boilerplate
==============================


Getting Started
---------------

1. Clone the repository into a working directory
2. Install dependencies with `npm install && npm run install:globals`
3. Copy the example config file to `development.json`, `test.json` and `production.json`
4. Create the database tables `npm run migration`
5. Run the tests `npm test`
6. Start the development server `npm start`


Directory Structure
-------------------

* `\bin` Scripts for creating, editing and searching DB records
* `\config` Environment configuration files
* `\lib` Modules used throughout the project
* `\migrations` Database migration scripts
* `\models` Database models
* `\routes` HTTP route handlers


Extending or Creating Models
----------------------------

1. Update or create a model module in `/models`
2. Run `npm migration:create` to create a new migration script in `/migrations`
3. Update the migration script to reflect your model changes
4. Run `npm run migration` to update your database

Database records can be added, edited and searched using the utility scripts in `/bin`.