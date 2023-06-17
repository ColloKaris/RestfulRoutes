//Require express
const express = require('express')
// Execute it
const app = express();
//require body parsing middleware
const bodyParser = require('body-parser')
// Require the path that will be used to set paths to views
const path = require('path')
//using uuid to generate random unique ids to mimic
//what we would get from a real database
const { v4: uuid } = require('uuid');

//require method override so that we can use DELETE, PATCH, PUT
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({extended: false}))

//use method-override
app.use(methodOverride('_method'))

// set a path to the views directory
app.set('views', path.join(__dirname, 'views'))

// set the templating engine to be ejs
app.set('view engine', 'ejs');

// create comments
let comments = [
    {   
        id: uuid(),
        username: "Todd",
        comment: "lol that is so funny!"
    },
    {
        id:uuid(),
        username: "Skyler",
        comment: "I like to go birdwatching with my dog"
    },
    {
        id: uuid(),
        username: "Sk8erBoi",
        comment: "Plz delete your account, Todd"
    },
    {
        id:uuid(),
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
    comments.push({username, comment, id: uuid() })
    res.redirect('/comments'); //defaults to a get
})
// show route to view a single comment using the id field
app.get('/comments/:id', (req,res) => {
    //take the id from the request, for that we use req.params.id
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
})

// a PATCH route to update a comment
app.patch('/comments/:id', (req,res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id ===id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

// route to serve a form to edit a comment
app.get('/comments/:id/edit', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    //render a form
    // we are passing in a comment because we want access to it
    // so that we can prepopulate a form
    res.render('comments/edit', { comment})
})

// Route to delete comments
app.delete('/comments/:id', (req,res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id) //making a new array. Immutability
    //don't mutate an array. Make a copy and make a change to the copy
    res.redirect('/comments');
})


//listen
app.listen(3000, () => {
    console.log("ON PORT 3000")
})


