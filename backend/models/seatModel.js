const mongoose = require("mongoose");

const seatSchema = mongoose.Schema({
  number: { 
    type: Number, 
    required: true },
  
    row: { 
    type: Number, 
    required: true },
  
    isBooked: { 
    type: Boolean, 
    default: false },
});

// const bookedSchema = mongoose.Schema(
//     {
//         seats:{
//             type:[ticketSchema],
//             required: true,
//         },
//         createdAt:{
//             type: Date,
//             default: Date.now,
//         }
//     }
// );

const Seat = mongoose.model("Seat",seatSchema);

module.exports = Seat;
