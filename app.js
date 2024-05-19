const express = require("express")
require("express-async-errors")
require("dotenv").config()

const session = require("express-session")

const app = express()

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

app.set("view engine", "ejs")
app.use(require("body-parser").urlencoded({ extended: true }))

app.get("/secretWord", (req, res) => {
    if(!req.session.secretWord) {
        req.session.secretWord = "syzygy"
    }

    res.render("secretWord", {
        secretWord: req.session.secretWord
    })
})

app.post("/secretWord", (req, res) => {
    secretWord = req.body.secretWord
    res.redirect("/secretWord")
})

app.use((req, res) => {
    res.status(404).send(`That page (${req.url}) was not found.`)
})

app.use((err, req, res, next) => {
    res.status(500).send(err.message)
    console.log(err)
})

const port = process.env.PORT || 3000

const start = async() => {

    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch(err) {
        console.log(err)
    }
}

start()