const express = require('express')
const app = express()
//const bodyParser = require('body-parser');
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const authJwt = require('./helpers/jwt')
const errorhand = require('./helpers/errorHandler')

//Environment Variable
//require('dotenv/config')
require('dotenv').config()
const api = process.env.API_URL

//Cors
app.use(cors())
app.options('*', cors())

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(authJwt());
app.use(errorhand);

//Routes
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')

app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, ordersRoutes)

//Database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        dbName: 'eshop-database',
    })
    .then(() => {
        console.log('Database Connection is ready...')
    })
    .catch((err) => {
        console.log(err)
    })

//Server
app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
})
