//Dependencies
// =======================================================
const express = require("express");
// const router = express.Router();
const db = require("../config/connection");
const Products = require("../models/Products");

module.exports = function(app) {
	//get all products
	app.get("/products/all", (req, res) => {
		Products.findAll({
			where: { primary_item: true }
		})
			.then(data => {
				res.json(data);
			})
			.catch(error => {
				console.log(`ERROR: ${error}`);
			});
	});

	//get products by category
	app.get("/products/category/:category", (req, res) => {
		Products.findAll({
			where: { category: req.params.category }
		})
			.then(data => {
				res.json(data);
			})
			.catch(err => {
				console.log(err);
			});
	});

	//get products by brand
	app.get("/products/brand/:brand", (req, res) => {
		Products.findAll({
			where: { brand: req.params.brand }
		})
			.then(data => {
				res.json(data);
			})
			.catch(err => {
				console.log(err);
			});
	});

	//Updating DB upon order being processed
	app.put("/products/checkout/update/:id/:newstock", (req, res) => {
		Products.update(
			{ stock: req.params.newstock },
			{ where: { id: req.params.id } }
		)
			.then(function(dbProduct) {
				console.log(dbProduct);
				res.status(200);
			})
			.catch(err => {
				console.log(err);
			});
	});

	//get single-item based off route-name
	// app.get("/api/:routename", (req, res) => {
	// 	Products.findAll({
	// 		where: { route_name: req.params.routename }
	// 	})
	// 		.then(function(data) {
	// 			res.json(data);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// });

	app.get("/api/:routename", (req, res) => {
		Products.findAll({
			where: { route_name: req.params.routename }
		})
			.then(function(data) {
				// res.json(data);
				if (data.length > 0) {
					Products.findAll({
						where: {
							product_name:
								data[0]
									.product_name
						}
					})
						.then(function(allData) {
							res.json(allData);
						})
						.catch(function(err) {
							console.log(err);
						});
				}
			})
			.catch(err => {
				console.log(err);
			});
	});
};
