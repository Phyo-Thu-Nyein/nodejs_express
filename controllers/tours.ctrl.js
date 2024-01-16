const { json } = require('express');
const Tour = require('../models/tours.model');

//middleware
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    if (req.params.id * 1 > jsonTours.length) {
        res.status(404).json({
            status: "fail",
            message: "invalid id",
        })
    }
    next();
}
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price || !req.body.duration) {
        return res.status(400).json({
            status: "fail",
            message: "name or pirce or duration fields are missing!",
        })
    }
    next();
}

exports.healthCheck = (req, res) => {
    res.status(200).send("Hello Tours!!");
}

exports.getAllTours = async (req, res) => {
    try {
        const dbtours = await Tour.find();
        res.status(200).json({
            message: "success",
            results: dbtours.length,
            data: dbtours,
        });
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: "smth went wrong"
        })
    }

}

exports.postNewTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(200).json({
            status: "success",
            message: "new data has been added successfully!",
        });

    } catch (error) {
        res.status(200).json({
            status: "fail",
            message: "something went wrong",
            error: error.message,
        });
    }
}

exports.findTourByID = async (req, res) => {
    // console.log(req.params);
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            message: 'success',
            data: tour,
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
};

exports.updateTourByID = async (req, res) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    try {
        res.status(200).json({
            message: 'success',
            data: {
                tour, // Return the Updated Tour
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.deleteTourByID = async(req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
          message: 'successfully deleted',
          data: null,
        });
      } catch (err) {
        res.status(404).json({
          status: 'fail',
          message: err,
        });
      }
}
