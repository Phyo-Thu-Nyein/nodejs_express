const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const middlewares = require('./middlewares/logger');
const toursRouter = require('./routers/tours.router');
const usersRouter = require('./routers/users.router');
var cors = require('cors');

dotenv.config("./env");

const app = express();

mongoose
    .connect(process.env.DB_URL)
    .then((connection) => {
        console.log('database connected');
        // console.log(connection);
    })
    .catch((error) => {
        console.log(error);
    });


console.log(app.get('env')); //express env

// console.log(process.env); //node env

app.use(express.json()); //newly added json data undefined //middleware
app.use(middlewares.myLogger);

if (process.env.NODE_ENV == "development") {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: "*",
}));

//REFACTORING THE CODE

app.use("/api/v1/tours", toursRouter);
app.use("/api/v1/auth", usersRouter);
app.use("/api/v1/users", usersRouter);

// app.route('/api/v1/tours')
//     .get(tourCtrl.getAllTours)
//     .post(tourCtrl.postNewTour);

// app.route('/api/v1/tours/:id')
//     .get(tourCtrl.findTourByID)
//     .patch(tourCtrl.updateTourByID)
//     .delete(tourCtrl.deleteTourByID);


//USER ROUTE SECTION
// app.route('/api/v1/users').get(userCtrl.getAllUsers); //get all users

// app.route('/api/v1/auth/register').post(userCtrl.register); // create one user
// app.route('/api/v1/auth/login').post(userCtrl.login); // login 

// app.route('/api/v1/users/:id').get(userCtrl.getUserByID); // get one user
// app.route('/api/v1/users/:id').patch(userCtrl.updateUserByID); // edit one user
// app.route('/api/v1/users/:id').delete(userCtrl.deleteUserByID); // delete one user


//listen on server
app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`server is running on port ${process.env.PORT}...`);
});














//non-arrow func
// app.get('/', function (req, res) {
//     res.status(200).send('Hello Tours!!!!!!');
// });


// app.get('/', healthCheck);

// //GET THE JSON DATA
// app.get('/api/v1/tours', getAllTours);
// //POST NEW JSON DATA
// app.post('/api/v1/tours', postNewTour);

// //FIND TOUR WITH AN ID
// app.get('/api/v1/tours/:id', findTourByID);

// //PATCH METHOD
// app.patch('/api/v1/tours/:id', updateTourByID);

// //DELETE METHOD
// app.delete('/api/v1/tours/:id', deleteTourByID);
