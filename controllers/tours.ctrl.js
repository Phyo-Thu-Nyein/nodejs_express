const { json } = require('express');
const fs = require('fs');

//read file
const tours = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`);
const jsonTours = JSON.parse(tours); //change to json format

//middleware
exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    if (req.params.id * 1 > jsonTours.length) {
        res.status(404).json({
            status: "fail", 
            message : "invalid id",
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

exports.getAllTours = (req, res) => {
    res.status(200).json({
        message: "success",
        results: jsonTours.length,
        data: jsonTours,
    });
}

exports.postNewTour = (req, res) => {
    console.log(req.body);
    const newTour = {
        id: jsonTours.length,
        ...req.body,
    };
    jsonTours.push(newTour); //adding the newly added json data into the file

    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(jsonTours),
        (err) => {
            if (err) {
                return res.status(500).json({ //cannot send more than one req, thus "return"
                    status: "fail",
                    message: "something went wrong",
                });
            }
            res.status(200).json({
                status: "success",
                message: "new data has been added successfully!",
            });
        }
    );
}

exports.findTourByID = (req, res) => {
    // console.log(req.params);

    const id = parseInt(req.params.id);

    const oneTour = jsonTours.find((tour) => tour.id === id);

    if (oneTour) {
        return res.status(200).json({
            status: "success",
            data: oneTour,
        });
    }
    res.status(200).json({
        status: "success",
        message: "No tour with that ID found",
        data: [],
    });
}

exports.updateTourByID = (req, res) => {
    // console.log(req.params);

    const id = parseInt(req.params.id);
    const tourToUpdate = req.body;

    const oneTour = jsonTours.find((tour) => tour.id === id);

    if (!oneTour) {
        return res.status(200).json({
            status: "success",
            message: "No tour with that ID found",
            data: [],
        });
    }

    const updatedTours = jsonTours.map((tour) => {
        if (tour.id === id) {
            return { ...tour, ...tourToUpdate };
        }
        return tour;
    })

    fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(updatedTours),
        (err) => {
            if (err) {
                return res.status(500).json({ //cannot send more than one req, thus "return"
                    status: "fail",
                    message: "something went wrong",
                });
            }
            res.status(200).json({
                status: "success",
                message: "The tour is updated successfully",
            });
        }
    );
}

exports.deleteTourByID = (req, res) => {
    const id = parseInt(req.params.id);
    const oneTour = jsonTours.find((tour) => tour.id === id);

    if (!oneTour) {
        return res.status(200).json({
            status: "success",
            message: "No tour with that ID found",
            data: [],
        });
    }

    const index = jsonTours.indexOf(oneTour);

    jsonTours.splice(index, 1);

    fs.writeFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,
        JSON.stringify(jsonTours),
        (err) => {
            if (err) {
                return res.status(500).json({ //cannot send more than one req, thus "return"
                    status: "fail",
                    message: "something went wrong",
                });
            }
            res.status(204).json({
                status: "success",
                message: "The tour is deleted successfully",
                data: null,
            });
        }
    );


}
