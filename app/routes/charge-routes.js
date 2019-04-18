//Dependencies
// =======================================================
const express = require("express");
const keys = require("../config/keys.js");

module.exports = function(app) {
	app.post("/charge", (req, res) => {
		let cartTotal = req.session.cartTotal;

		console.log(req);

		const stripe = require("stripe")(keys.stripeSecretKey);

		stripe.charges
			.create({
				email: req.body.stripeEmail,
				source: req.body.stripeToken
			})
			.then(customer =>
				stripe.charges.create({
					amount: cartTotal,
					description: "Stache Shop",
					currency: "usd",
					customer: customer.id
				})
			)
			.then(charge => res.render("success"));
	});
};
