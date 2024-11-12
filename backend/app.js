const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDB } = require('./db/connection');
const appRouter = require('./routes/index.js');

dotenv.config();

console.log("COOKIE_SECRET: ", process.env.JWT_SECRET);  // Debugging line

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))

connectToDB();

app.use("/api/v1", appRouter);

app.get('/set-cookie', function(req, res) {
    res.cookie('cookie1', 'This is my first cookie', { signed : true });
    res.send(req.signedCookies.cookie1);
})

app.get('/', (req, res) => {
    res.send("Hello from the backend server!");
})

app.listen(4000, () => {
    console.log("Server running on port 4000...");
})