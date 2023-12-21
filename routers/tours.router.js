const express = require('express');
const tourCtrl = require('../controllers/tours.ctrl');

const toursRouter = express.Router();

//mount the router
toursRouter
    .route("/")
    .get(tourCtrl.getAllTours)
    .post(tourCtrl.postNewTour);

toursRouter
    .route("/:id")
    .get(tourCtrl.findTourByID)
    .patch(tourCtrl.updateTourByID)
    .delete(tourCtrl.deleteTourByID);

module.exports = toursRouter;