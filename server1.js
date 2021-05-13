require('dotenv').config('./config.env')
const express = require('express');
const mongoose = require('mongoose')
const path = require('path')
//local files 
const setRoute = require('./api/routes/routes')
const setMiddleware = require('./middleware/middleware')


const PORT = process.env.PORT || 5000
// database connection 
const DATABASE_URL = 'mongodb+srv://betmeapp:TkE60lfL4JjBxfXH@cluster0.1zjgn.mongodb.net/test';
const localhostUrl = 'mongodb://localhost/betingapp';
// const DATABASE_URL = 'mongodb+srv://betmeapp:TkE60lfL4JjBxfXH@cluster0.1zjgn.mongodb.net/gamesapp';
const app = express();

app.use(setMiddleware)
setRoute(app);
// if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    })
// }

mongoose.connect(localhostUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then((info) => {
        console.log('Database is connecting on localserver ');
        app.listen(PORT, () => {
            console.log('Server is running on port : ', PORT);
        })
    })
    .catch(e => {
        console.log('Database error happening')
    })

// app.use(express.static('client/build'))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// })