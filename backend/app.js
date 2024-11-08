const express = require("express");
const app = express();
const dotenv = require("dotenv");

const { connectToDB } = require('./db/connection');
const appRouter = require('./routes/index.js');

dotenv.config();
app.use(express.json());

connectToDB();

app.use("/api/v1", appRouter);

app.get('/', (req, res) => {
    res.send("Hello from the backend server!");
})

app.listen(4000, () => {
    console.log("Server running on port 4000...");
})