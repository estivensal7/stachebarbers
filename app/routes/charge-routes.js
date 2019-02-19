//Dependencies
// =======================================================
const express = require("express");


module.exports = function(app) {

	app.post("/charge", (req, res) => {
                
                let cartTotal = req.session.cartTotal;

                console.log(req);

                const stripe = require('stripe')('sk_test_P3IxjKMfr7aqzjaid30giao4');

                stripe.charges.create({
                        email: req.body.stripeEmail,
                        source: req.body.stripeToken
                        })
                        .then(customer => stripe.charges.create({
                        amount: cartTotal,
                        description: 'Stache Shop',
                        currency: 'usd',
                        customer: customer.id
                })).then(charge => res.render('success'));

        })
	
}