const { json } = require("express");
const Seats = require("../models/seatModel");
const asyncHandler = require("express-async-handler");

// Controller to get all seats (from the database)
const getseats = asyncHandler(async (req, res) => {
  const seats = await Seats.find();
  res.json(seats);
});

// Controller to add seats data 
const createseats = asyncHandler(async (req, res) => {
  const { number, row, isBooked } = req.body;
  if (!number || !row) {
    res.status(400);
    throw new Error({ message: "Please fill the details" });
  } else {
    const seat = new Seats({ number, row, isBooked });
    const newSeat = await seat.save();
    res.status(201).json({ message: "Seat Created" });
  }
});


// Controller to book seats(i.e. making isBooked-->true if needed) 
const bookseats = asyncHandler(async (req, res) => {
  try {
    const seatqty = parseInt(req.body.quantity);

    // console.log("This is seat quantity to be booked-->"+ seatqty);

    const seats = await Seats.find();

    // function that return no of seats left to check wheather the no of seats we want to book is avialable or not
    let seatsLeft = parseInt(findseatLeft(seats));
    if (seatsLeft < seatqty) {
      return res
        .status(400)
        .json({ Message: "These number of seats are not Available" });
    }

    // first checking whaether seats in a row can be possible
    let booking_seats = row_seats(seats, seatqty);
    // let seats_filledRow = null;

    // when seats in
    if (!booking_seats) {
      booking_seats = filled_row(seats, seatqty);
    }

    //making booking seats as booked
    for (let i = 0; i < seats.length; i++) {
      if (booking_seats.includes(seats[i].number)) {
        seats[i].isBooked = true;
        await seats[i].save();
      }
    }



    res.json({booking_seats});
  } catch (err) {
    console.error(err);
    res.status(404).json({message:"Error Occured in booking the seats"})
  }
});

// function that return the number of seats left in train
function findseatLeft(seat) {
  // const seats = seat;
  let qty = 0;
  for (let i = 0; i < seat.length; i++) {
    if (seat[i].isBooked == false) {
      qty = qty + 1;
    }
  }
  return qty;
}

// function that return all seats in a row if possible
function row_seats(seats, seatqty) {
  let seat_row = 0;

  let seats_to_book = [];

  while (seat_row < 12) {
    let count = 0;
    // condition for last as it contain only 3 element only
    if (seat_row === 11) {
      for (let i = 0; i < 3; i++) {
        let ind = seat_row * 7 + i;
        count = count + 1;
        seats_to_book.push(seats[ind].number);
      }
      if (count === seatqty) {
        return seats_to_book;
      }
    }

    for (let i = 0; i < 7; i++) {
      let ind = seat_row * 7 + i;
      if (seats[ind].isBooked === false) {
        count++;
        seats_to_book.push(seats[ind].number);
      }
      if (count === seatqty) {
        return seats_to_book;
      }
    }
    seat_row++;
    seats_to_book = [];
    count = 0;
  }

  return null;
}

// when in one row seats are not possible
function filled_row(seats, seatqty) {
  let count = 0;
  let seats_to_book = [];

  for (let i = 0; i < seats.length; i++) {
    if (seats[i].isBooked === false) {
      count++;
      seats_to_book.push(seats[i].number);
    }
    if (count === seatqty) {
      return seats_to_book;
    }
  }

  return null;
}

module.exports = { getseats, createseats, bookseats };
