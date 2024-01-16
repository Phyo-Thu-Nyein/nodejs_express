const mongoose = require('mongoose');

//CREATE A MONGOOSE SCHEMA FOR TOUR COLLECTION (TABLE)
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: Number,
    rating: Number,
    duration: Number,
});

//CREATE A MONGOOSE MODEL FOR TOUR COLLECTION (TABLE)
const Tour = mongoose.model("MyTours", tourSchema);

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


module.exports = Tour;