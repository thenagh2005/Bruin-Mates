const express = require("express");
const app = express();
const dotenv = require("dotenv");

const { connectToDB } = require('./db/connection');

dotenv.config();
app.use(express.json());

connectToDB();

app.get('/', (req, res) => {
    res.send("Hello from the backend server!");
})

app.listen(4000, () => {
    console.log("Server running on port 4000...");
})