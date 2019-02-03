// index.js sets the default bride for all routes.
// Uses router to find routes and return data to server

// Create dependencies
const path = require("path");
const router = require("express").Router();
const database = require("./api-routes");

// Router for database communication
router.use("/products", database);

// Default route to index.html
router.use(function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Export and return route results
module.exports = router;