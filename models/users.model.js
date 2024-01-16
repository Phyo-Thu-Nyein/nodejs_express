const mongoose = require('mongoose');

//CREATE A MONGOOSE SCHEMA FOR TOUR COLLECTION (TABLE)
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: String,
    age: Number,
    phnumber: Number,
    password: {
        type: String,
        required: true,
    },
});

//CREATE A MONGOOSE MODEL FOR TOUR COLLECTION (TABLE)
const User = mongoose.model("My Users", userSchema);

//ADD A NEW RECORD (ROW)
// const testTour = new Tour({
//     name: 'Putao',
//     price: 200,
//     rating: 4,
// });

//SAVE THE DOCUMENT
// testTour
//     .save()
//     .then((doc) => {
//         console.log(doc);
//         console.log("document saved");
//     })
//     .catch((error) => {
//         console.log(error);
//     });


module.exports = User;