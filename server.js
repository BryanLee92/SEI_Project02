//Dependencies
const express = require("express");
const mongoose = require("mongoose")
const session = require("express-session")
const bcrypt = require("bcrypt")
const override = require("method-override")
const app = express();

//port
const PORT = process.env.PORT || 3000;

//Database
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://Nudels:mick3ymous@foodie.6p9ujvd.mongodb.net/?retryWrites=true&w=majority"
const db = mongoose.connection
mongoose.connect(mongoURI, {useNewUrlParser: true}, ()=>{
    console.log("Connected")
})
db.on("error", (err)=>{
    console.log(err.message)
});
db.on("disconnect", ()=>{
    console.log("MongoDB disconnected")
});

//Controller
const foodieController = require("./controllers/foodie/foodie.js")
const loginController = require("./controllers/login/login.js")

app.use(
    session({
        secret:"imgonnasleepwhenyoureadfinishthis",
        resave: false,
        saveUnitialized: false
    })
);

//middleware
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(override("_method"))
app.use("/foodie", foodieController)
app.use("/sessions", loginController)

//main route
app.get("/", (req, res)=>{
    res.render("index.ejs", {userdata: req.session.currentUser})
})

//listener
app.listen(PORT, ()=>{
    console.log(`Listening at port: ${PORT}`)
})