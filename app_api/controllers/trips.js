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

module.exports = {
  tripsList,
  tripsFindByCode,
};
