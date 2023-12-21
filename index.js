const express = require('express');
const morgan = require('morgan');
const middlewares = require('./middlewares/logger');
const toursRouter = require('./routers/tours.router');
const usersRouter = require('./routers/users.router');

const app = express();

app.use(express.json()); //newly added json data undefined //middleware
app.use(middlewares.myLogger);
app.use(morgan('dev'));

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
app.listen(8000, "0.0.0.0", () => {
    console.log("server is running on port 8000...");
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
