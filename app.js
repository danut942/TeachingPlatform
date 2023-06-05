const express = require('express');
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = req

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/teachingDB");

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

app.get('/',(req,res) => {
    res.send('Teaching Home Page');
})

app.get('/login', (req,res) => {
    res.render("login");
})

app.listen(port,() => {
    console.log('App listening on port',port)
})