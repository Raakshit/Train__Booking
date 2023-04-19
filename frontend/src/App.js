import "./App.css";
import Navbar from "./Components/Navbar";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { RiArrowUpDownLine } from "react-icons/ri";
import { FaCouch } from "react-icons/fa";
import Loading from "./Components/Loading";
import BookImage from "./BookImage.json";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [seatData, setSeatData] = useState(null);
  const [seatQuantity, setSeatQuantity] = useState("");

  // importing data from backend
  const fetchdata = async () => {
    const seat = await axios.get("https://train-booking-pbgt.onrender.com/api/seats/");
    setSeatData(seat.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // console.log(seatData);

  const handleSeatsbooking = async () => {
    const assurence = window.confirm("Are You sure You want to Book Tickets?");
    if (assurence) {
      try {
        const seatNumber = await axios.put(
          "http://localhost:8800/api/seats/bookseat",
          { quantity: seatQuantity }
        );
        const numbers = seatNumber.data.booking_seats;
        console.log(numbers.toString());
        toast.info(`Your seats With NUmber ${numbers.toString()} are Bokked`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSeatQuantity("");
        fetchdata();
        // loading data from backend
      } catch (err) {
        alert(err.response.data.message);
      }
    } else {
      setSeatQuantity("");
      return;
    }
  };

  // console.log(seatQuantity)

  return (
    <div className="App">
      <div className="app__navbar">
        <Navbar />
      </div>
      <div className="main">
        {/* THis is the complete left part of the website that contain: details about booking */}
        <div className="main__left">
          <div className="main__left__heading">
            <p>
              Come Book Your <span style={{ color: "red" }}>Ride with Us</span>
            </p>
          </div>
          <div className="lottie_image">
            <Lottie animationData={BookImage} />
          </div>
          <div className="main__left__middle">
            <div className="main__left__info">
              <FaMapMarkerAlt className="input__icon" />
              <input className="input-field" type="text" placeholder="From" />
            </div>
            <RiArrowUpDownLine style={{ fontSize: "27px" }} />
            <div className="main__left__info">
              <IoIosSend className="input__icon" />
              <input className="input-field" type="text" placeholder="To" />
            </div>
            <button type="" className="btn-train">
              Search Available Train
            </button>
            <div className="main__left__bottom">
              <input
                min={1}
                max={7}
                value={seatQuantity}
                onChange={(e) => setSeatQuantity(e.target.value)}
                placeholder="Select number of seats"
                className="input-field-seats"
                type="number"
                name="input-field"
              />
            </div>
            <button onClick={handleSeatsbooking} className="btn">
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              Book Now
            </button>
          </div>
        </div>

        {/* This is the Complete right part that contain info about the seats details */}
        <div className="main__right">
          <div className="main__right__header">
            <div className="right__header__info">
              <FaCouch style={{ color: "red", fontSize: "25px" }} />
              <p>Booked</p>
            </div>
            <div className="right__header__info">
              <FaCouch
                style={{ color: "rgb(48, 187, 48)", fontSize: "25px" }}
              />
              <p>Vacant</p>
            </div>
          </div>
          {!seatData ? (
            <div className="seat__loading">
              <Loading />
            </div>
          ) : (
            <div className="main__right__seatsInfo">
              <h2>Seats Available</h2>
              <div className="seats_arrange">
                {seatData?.map((item) => (
                  <div className="seat__info" key={item.number}>
                    {item.isBooked ? (
                      <FaCouch className="seat_icon" style={{ color: "red" }} />
                    ) : (
                      <FaCouch
                        className="seat_icon"
                        style={{ color: "rgb(48, 187, 48)" }}
                      />
                    )}
                    {item.number}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="main__right__book"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
