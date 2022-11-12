const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRouter = require('./Routers/todoRouter');
const app = express();

// Middleware 
app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT;

// Database connection with mongoose
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.klu77.mongodb.net/TodoCollection?retryWrites=true&w=majority`;
mongoose.connect(uri)
    .then(() => console.log('Connection successful'))
    .catch(err => console.log(err));



// todoRouter 
app.use('/todo', todoRouter);



app.use('/', (req, res) => {
    res.send('Home Route');
})

// Default error handler
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).send('There is a server-side error.')
    }
})

app.listen(port, () => console.log("Listening to port at", port));
