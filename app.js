const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const url = require("url")
const session = require("express-session")
const validator = require("express-validator")


app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

const guessRoutes = require("./routes/routes")
app.use(guessRoutes)

app.listen(3000, function() {
  console.log("We are going to play game")
})
