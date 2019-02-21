//Dependencies
const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/config.json')[env];
// Construct variable
let sequelize;

// Create sequelize connection
// If deployed on heroku, use JAWSDB database
if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
}
// Use local host
else {
	sequelize = new Sequelize("stacheBarbers", "root", "root1234", {
		host: "localhost",
		dialect: "mysql",
		port: 3306,
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
	});
}

// export sequlize instance
module.exports = sequelize;