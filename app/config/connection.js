//Dependencies
const Sequelize = require('sequelize');

const sequelize = new Sequelize('lfesn5sm21okzzlw', 'qkfwtu56seke27ve', 'ac35qjiubyn0vf8z', {
        host: 'pwcspfbyl73eccbn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
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