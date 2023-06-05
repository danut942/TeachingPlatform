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

const User = new mongoose.model("User",userSchema);

app.get('/',(req,res) => {
    res.render("teaching");
})

app.get('/login', (req,res) => {
    res.render("login");
})

app.get('/register', (req,res) => {
    res.render("register");
})

app.get('/home', (req,res) => {
    res.render("home");
})

// register an user and render teaching home page if successfull
app.post("/register",(req,res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })

    newUser.save();
    res.redirect("home");
});

// check for an existing user and login
app.post("/login",(req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    async function runFindUser(){
        const foundUser = await User.findOne({email:username});

        if(foundUser.password === password){
            res.render("home");
        }
    }
    runFindUser().catch(console.dir);
});



app.listen(port,() => {
    console.log('App listening on port',port)
})