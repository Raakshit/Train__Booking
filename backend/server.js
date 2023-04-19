const express = require("express");
const connectDb = require('./config/db');
const dotenv = require("dotenv");
const SeatRoutes = require('./Routes/seatsRoutes');
const cors = require('cors');

const app = express();
app.use(cors(
    {
        origin:[process.env.API_URL , 'http://localhost:3000']
    }
));
dotenv.config();

connectDb();
app.use(express.json());

// app.get('/' , (req,res) => res.send("Hello"))

app.use('/api/seats/',SeatRoutes)

const port = process.env.PORT || 8800;
app.listen(port , () => 
console.log(`Server Running Under the port ${port}`)
);