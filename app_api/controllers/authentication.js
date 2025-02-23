const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: "",
    });

    user.setPassword(req.body.password);
    const q = await user.save();

    if (!q) {
        // Database returned no data
        return res.status(400).json(err);
    } else {
        // Return new user token
        const token = user.generateJWT();
        return res.status(200).json(token);
    }
};

const login = (req, res) => {
    // validate msg to ensure that email and password are present
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "All fields required." });
    }

    // delete authentication to passport module
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            // Error in auth process
            return res.status(404).json(err);
        }

        // auth succeeded - generate JWT and return to caller
        if (user) {
            const token = user.generateJWT();
            res.status(200).json({ token });
        }
        // auth failed - return error
        else {
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports = {
    register,
    login,
};
