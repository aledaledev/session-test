const express = require('express')
const session = require('express-session')

const app = express()

app.use(express.json())

app.use(session({
    key: "cookie-name",
    secret:"super-secret",
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req,res) =>{
    req.session.user = 'Damian',
    req.session.role = 'admin',
    req.session.views = req.session.views?++req.session.views:1;

    res.json({message:`user ${req.session.user} (${req.session.role}) has visited this page ${req.session.views} times`})
})

app.get('/user',(req,res) => {
    res.send(req.session.user)
})

app.use((req,res,next) => {
    res.status(404).json({error:"not found"})
})

app.listen(3000, (req, res) => {
    console.log('server running on port 3000')
})