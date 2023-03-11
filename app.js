const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

//Environment Variable
require('dotenv/config')
const api = process.env.API_URL

const productsRouter = require('./routers/products')

//Middleware
app.use(express.json())
app.use(morgan('dev')) //short, tiny

//Routers
app.use(`${api}/products`, productsRouter)

mongoose
    .connect(process.env.CONNECTION_STRING, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // retryWrites: false,
        dbName: 'eshop-database',
    })
    .then(() => {
        console.log('Database connection is ready!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log('server is running  http://localhost:3000')
})
