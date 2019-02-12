//Dependencies
const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_e0aaacc1c5b6261', 'bda6cccc103dc0', '216ff071', {
        host: 'us-cdbr-iron-east-03.cleardb.net',
        dialect: 'mysql',
        operatorsAliases: false,

        pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
        }
});

module.exports = sequelize;