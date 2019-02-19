//Dependencies
// =======================================================
const Sequelize = require('sequelize');
const sequelize = require('../config/connection.js');

//Creates a 'Product' model that matches up with DB
const Product = sequelize.define('product', {

	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	product_name: {
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.STRING
	},
	category_two: {
		type: Sequelize.STRING
	},
	brand: {
		type: Sequelize.STRING
	},
	price: {
		type: Sequelize.DECIMAL(4, 2)
	},
	size: {
		type: Sequelize.BOOLEAN
	},
	stock: {
		type: Sequelize.INTEGER
	}	
},

	{
		timestamps: false
	});

// Product.sync();s

module.exports = Product;