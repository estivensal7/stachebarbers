//Dependencies
const Sequelize = require('sequelize');
// var env = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/config.json')[env];

if (process.env.JAWS_DB) {
        var sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
        var sequelize = new Sequelize(config.database, config.username, config.password, config, {
                host: config.host,
                dialect: 'mysql',
                operatorsAliases: false,
                
                pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                }
        });
}

module.exports = sequelize;