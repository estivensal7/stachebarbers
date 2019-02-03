//Dependencies
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./app/config/connection");
const htmlRoutes = require('./app/routes/html-routes.js');
const apiRoutes = require('./app/routes/api-routes.js');

//Initialize app
const app = express();

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("app/public"));

app.use("/", htmlRoutes);
// app.use("/products", apiRoutes);
require('./app/routes/api-routes.js')(app);

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
