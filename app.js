const express = require('express');
const mongoose = require('mongoose');
const planRouter = require('./routes/planRoutes.js');
// const TaskPlanner = require('./model/planner.js');

const server = express();
const PORT = 3000;

server.use(express.json());
server.use('/plans',planRouter);
server.get('/', (req, res) => {
    res.send("Welcome to the Task Planner API");
});
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://adheethi2003:2ySCBdVEiftjJT6@cluster0.iio96.mongodb.net/E48DB');
        console.log("Database connection successful");
    } catch (err) {
        console.error("Database connection failed:", err);
    }
};

// Initialize database connection
connectDB();

// Start the server
server.listen(PORT, () => {
    console.log(`server started...`);
});