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
	product_category: {
		type: Sequelize.STRING
	},
	product_category_two: {
		type: Sequelize.STRING
	},
	product_brand: {
		type: Sequelize.STRING
	},
	product_price: {
		type: Sequelize.DECIMAL(4, 2)
	},
	product_stock: {
		type: Sequelize.INTEGER
	}	
},

	{
		timestamps: false
	});

// Product.sync();s

module.exports = Product;