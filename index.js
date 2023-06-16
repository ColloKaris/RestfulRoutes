//Require express
const express = require('express')
// Execute it
const app = express();
//require body parsing middleware
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

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


