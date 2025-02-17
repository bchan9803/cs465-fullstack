const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");

// GET: /trips - lists all the trips
// Regardless of outcome, res must include HTML status code
// and JSON msg to the requesting client
const tripsList = async (req, res) => {
    // No filter, return all records
    const q = await Model.find({}).exec();

    // to show results of query
    console.log(q);

    if (!q) {
        // database returned no data
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

// GET: /trips/:tripsCode - lists a single trip
// Regardless of outcome, res must include HTML status code
// and JSON msg to the requesting client
const tripsFindByCode = async (req, res) => {
    // No filter, return all records
    const q = await Model.find({ code: req.params.tripCode }).exec();

    // to show results of query
    console.log(q);

    if (!q) {
        // database returned no data
        return res.status(404).json(err);
    } else {
        return res.status(200).json(q);
    }
};

// POST method
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
    });

    const q = await newTrip.save();

    // database returned no data
    if (!q) {
        return res.status(400).json(err);
    }
    // Return new trip
    else {
        return res.status(201).json(q);
    }
};

// PUT method
const tripsUpdateTrip = async (req, res) => {
    const q = await Model.findOneAndUpdate(
        { code: req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description,
        }
    ).exec();

    // database returned no data
    if (!q) {
        return res.status(400).json(err);
    }
    // Return new trip
    else {
        return res.status(201).json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
};
