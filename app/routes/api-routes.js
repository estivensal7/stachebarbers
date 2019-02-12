//Dependencies
// =======================================================
const express = require("express");
// const router = express.Router();
const db = require("../config/connection");
const Products = require("../models/Products");

module.exports = function(app) {

	//get all products
	app.get("/products/all", (req, res) => {
		Products.findAll({})
		.then((data) => {
			res.json(data);
			// console.log(data);
		}).catch(error => {
			console.log(`ERROR: ${error}`);
		})
	});

	//get products by category
	app.get("/products/category/:category", (req, res) => {
		Products.findAll({
			where: { category: req.params.category}
		}).then((data) => {
			res.json(data);
		}).catch(err => {
			console.log(err);
		})
	})

	//get products by brand
	app.get("/products/brand/:brand", (req, res) => {
		Products.findAll({
			where: { brand: req.params.brand}
		}).then((data) => {
			res.json(data);
		}).catch(err => {
			console.log(err);
		})
	})
	
}