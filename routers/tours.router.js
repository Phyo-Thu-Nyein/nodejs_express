const express = require('express');
const tourCtrl = require('../controllers/tours.ctrl');

const toursRouter = express.Router();

//mount the router
toursRouter
    .route("/")
    .get(tourCtrl.getAllTours)
    .post(tourCtrl.checkBody, tourCtrl.postNewTour);

toursRouter
    .route("/:id")
    .get(tourCtrl.findTourByID)
    .patch(tourCtrl.updateTourByID)
    .delete(tourCtrl.deleteTourByID);

// toursRouter.param("id", (req, res, next, val) => {
//     console.log(`Tour id is ${val}`);
//     next();
// });

toursRouter.param("id", tourCtrl.checkID);

module.exports = toursRouter;