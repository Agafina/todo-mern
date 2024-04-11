const express = require('express')
require('dotenv').config()
const todoRoutes = require('./router/todoRoutes')
const userRoutes = require('./router/user')
const mongoose = require('mongoose')


const app = express()

app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/todos', todoRoutes)
app.use('/api/users', userRoutes)

mongoose.connect(process.env.URI)
    .then(() => {

        app.listen(process.env.PORT, () =>{
            console.log('connected to DB & listening on port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })