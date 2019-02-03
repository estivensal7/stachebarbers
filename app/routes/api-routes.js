//Dependencies
// =======================================================
const express = require("express");
// const router = express.Router();
const db = require("../config/connection");
const Products = require("../models/Products");

module.exports = function(app) {

	app.get("/products/home", (req, res) => {
		Products.findAll({})
		.then((data) => {
			res.json(data);
			// console.log(data);
			// res.sendStatus(200);
		}).catch(error => {
			console.log(`ERROR: ${error}`);
		})
	});
	
}