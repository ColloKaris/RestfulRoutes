//Require express
const express = require('express')
// Execute it
const app = express();
//require body parsing middleware
const bodyParser = require('body-parser')
// Require the path that will be used to set paths to views
const path = require('path')

// set a path to the views directory
app.set('views', path.join(__dirname, 'views'))

// set the templating engine to be ejs
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: false}))

// create comments
const comments = [
    {
        username: "Todd",
        comment: "lol that is so funny!"
    },
    {
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        username: "Sk8erBoi",
        comment: "Plz delete your account, Todd"
    },
    {
        username: "onlysayswoof",
        comment: "woof woof woof"
    }
]

// the base url for this resource
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})
// new route - route to render a form to create new comments
// the form will send its data as a post request 
app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})
// post route to handle the form being submitted
app.post('/comments', (req,res) => {
    const {username, comment} = req.body;
    comments.push({username, comment})
    res.redirect('/comments'); //defaults to a get
})


// add basic get route
app.get('/tacos', (req, res) => {
    // .send() used to send a response
    res.send("GET /tacos response")
    console.log(req.query)
})

// add a basic post .route
app.post('/tacos', (req, res) => {
    const {meat, qty} = req.body
    res.send(`OK, here are your ${qty} ${meat} tacos`)
    
})

//listen
app.listen(3000, () => {
    console.log("ON PORT 3000")
})


