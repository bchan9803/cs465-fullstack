const express = require("express"); // Express app
const router = express.Router(); // Router logic

const jwt = require("jsonwebtoken");

// This is where we import the controllers we will route
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// register auth routes
router.route("/login").post(authController.login);
router.route("/register").post(authController.register);

// define route for login endpoint
router.route("/login").post(authController.login);

// method to auth our JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader == null) {
        console.log("Auth Header requireds but not present");
        return res.sendStatus(401);
    }

    let headers = authHeader.split(" ");

    if (headers.length < 1) {
        console.log("Not enough tokens in auth header: " + headers.length);

        return res.sendStatus(501);
    }

    const token = authHeader.split(" ")[1];

    if (token == null) {
        console.log("Null bearer token");
        return res.sendStatus(401);
    }

    const verified = jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, verified) => {
            if (err) {
                return res.sendStatus(401).json("Token validation error");
            }
            req.auth = verified;
        }
    );
    next();
}

// define route for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList) // GET method routes tripsList
    .post(tripsController.tripsAddTrip) // POST method adds a Trip

    .post(authenticateJWT, tripsController.tripsAddTrip);

// GET method routes tripsByCode - requires parameter
router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(tripsController.tripsDeleteTrip)

    .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
