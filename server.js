//Dependencies
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const stripe = require('stripe')('sk_test_P3IxjKMfr7aqzjaid30giao4');
const db = require("./app/config/connection");
const htmlRoutes = require('./app/routes/html-routes.js');
const apiRoutes = require('./app/routes/api-routes.js');

//Initialize app
const app = express();

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("app/public"));
// app.set('view engine', 'html');

app.use("/", htmlRoutes);
// app.use("/products", apiRoutes);
require('./app/routes/api-routes.js')(app);
// require('./app/routes/charge-routes.js')(app);

app.post('/charge', (req, res) => {
        const amount =req.body.coKey;

        console.log(req);

        stripe.customers.create({
          email: req.body.stripeEmail,
          source: req.body.stripeToken
        })
        .then(customer => stripe.charges.create({
          amount,
          description: 'Stache Shop',
          currency: 'usd',
          customer: customer.id
        }))
        .then(charge => res.sendFile(path.join(__dirname, './app/public/success.html')));
});

const PORT = process.env.PORT || 3000;


// Open server on PORT
db.sync().then(function() {
	app.listen(PORT, function(error) {
                if(error) {
                        console.log(`ERROR: ${error}`);
                } else {
                        console.log(
                                `Database Connected... \nListening to PORT ${PORT}`
                        )
                }
	})
})
