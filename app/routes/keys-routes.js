const keys = require("../config/keys.js");

module.exports = function(app) {
	//get keys
	app.get("/keys/all", (req, res) => {
		data = {
			STRIPE_PUB_KEY: keys.stripePublishableKey,
			STRIPE_SECRET_KEY: keys.stripeSecretKey
		};

		res.json(data);
	});
};
