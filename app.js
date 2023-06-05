const express = require('express');
const ejs = require("ejs");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set('view engine','ejs');


app.get('/',(req,res) => {
    res.send('Teaching Home Page');
})

app.get('/login', (req,res) => {
    res.render("login");
})

app.listen(port,() => {
    console.log('App listening on port',port)
})