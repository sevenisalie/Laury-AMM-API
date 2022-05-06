const express = require("express");
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const ethers = require("ethers");
require('dotenv').config()


//database
const URI = process.env.MONGODB_URI
mongoose.connect(URI)
const db = mongoose.connection

db.once('open', () => {
  console.log("Connected to database")
})

//cors
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//use JSON

app.use(express.json())

//route
const priceOracleRoute = require("./routes/price.js")
app.use('/price', priceOracleRoute)


const equityRouterRoute = require("./routes/equityRouter")
app.use("/router", equityRouterRoute)

const authenticateRoute = require("./routes/authenticate")
app.use("/authenticate", authenticateRoute)


const tokenRouter = require("./routes/equityRouter")
app.use("/routerInfo", tokenRouter)






//run it
const port = 8090 //for local

const PORT = process.env.PORT || 8090 //for prod


app.listen(
  PORT,
    () => console.log(`SERVER RUNNING ON PORT ${PORT}`)
)

