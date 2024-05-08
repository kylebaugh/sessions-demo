// Import packages
import express from 'express'
import nunjucks from 'nunjucks'
import session from 'express-session'

// Create instance of express class
const app = express()

// Setup middleware
app.use(express.urlencoded({extended: false}))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "this can be any random string of chara-fsdjcvokqp;wejrap342f0a f3oifnapo"
}))


// Endpoints go here
app.get('/', (req, res) => {

    if(req.session.emailAddress) {
        res.render('index.html', {emailAddress: req.session.emailAddress})
    }else{
        res.render('index.html')
    }
})

app.get('/login', (req, res) => {
    res.render('login.html')
})

app.post('/login', (req, res) => {
    const {email} = req.body
    console.log('original session', req.session)

    req.session.emailAddress = email

    console.log('updated session', req.session)

    res.render('dashboard.html', {email: email})
})

app.get('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

// Open server on a specified port
app.listen(2319, () => console.log('Server running on http://localhost:2319'))