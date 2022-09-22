const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(errorHandler)
app.use('/api/gratitudes',require('./routes/gratitudeRoutes'))

app.listen(port,() => console.log(`Sever is running on port ${port}`))

