const express = require('express');
const bodyParser = require("body-parser")
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

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

const secret = "Thisisthesecret";
userSchema.plugin(encrypt,{secret: secret, encryptedFields:["password"]});

app.get('/',(req,res) => {
    res.render("home");
})

app.get('/login', (req,res) => {
    res.render("login");
})

app.get('/register', (req,res) => {
    res.render("register");
})

app.listen(port,() => {
    console.log('App listening on port',port)
})