const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const MONGO_URI = process.env.MONGO_URI;
// const api = require('./backend/routes')

mongoose.connect(MONGO_URI);
mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
});

const app = express();
app.use(express.json())
app.use(cors());

app.use('/public', express.static('public'));

app.use('/api/users', require("./routes/student_route"))
app.use('/api/books', require("./routes/book_route"))
app.use('/api/issues', require("./routes/issue_route"))
app.use('/api/reviews',require("./routes/reviews_route"))

const port = 5000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

app.use((req, res, next) => {
    // Error goes via `next()` method
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});