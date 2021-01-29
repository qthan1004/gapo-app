const bodyParser = require("body-parser");
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/gapo-app', (err) => {
    if (err) {
        console.log(`Cannot connect to mongodb: ${err.toString()}`)
    }
});

const userRouters = require('./routes/users.routers')
const loginRouters = require("./routes/login.routers")
const postsRouters = require('./routes/posts.routers')

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(cors())

app.use('/users', userRouters)
app.use('/login', loginRouters)
app.use('/posts', postsRouters)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})