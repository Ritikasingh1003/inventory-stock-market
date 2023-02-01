const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


// routes middleware
app.use("/api/users", userRoute);

// Routes
app.get("/", (req,res) => {
    res.send("Home Page");
});


// connect to db
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`)
        })
    }).catch((err) => {
        console.log(err);
    });