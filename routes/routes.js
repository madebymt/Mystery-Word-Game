const express = require("express")
const router = express.Router()
const words = require("../words")
const fs = require('fs');
const session = require("express-session")

let sess = {
  secret: "mystery",
  cookie: {},
  saveUninitialized: true,
  resave: true
}

router.use(session(sess))


const randomWord = words.randomWord
console.log(randomWord)

//user guess array, so when user guess can push the letter to the array
let userGuessed = []
let userPoint = 0

// give user more point if the letter longer
function guessChange() {
  if (randomWord.length <= 9) {
    userPoint = 8
  } else if
    (randomWord.length <= 13)
    userPoint = 12
   else {
    userPoint = 16
   }
}
guessChange()

// make _ depend on the randomWord length
router.get("/", function(req, res) {
  let randomWordSplit = randomWord.split('')
  let blankSpace = false
  for (var i = 0; i < randomWord.length; i++) {
    if (userGuessed.indexOf(randomWord[i]) >= 0) {
      randomWordSplit[i] = randomWord[i]
    } else {
      randomWordSplit[i] = "_"
      blankSpace = true
    }
  }
  if (!blankSpace) {
    res.redirect("/win")
  } else {
    res.render("index", {
      userGuessed: userGuessed,
      randomWordSplit: randomWordSplit,
      randomWord: randomWord,
      userPoint: userPoint,
    })
  }
})

// page redirect

router.get("/lose", function(req, res) {
  res.render('lose', {});
});

router.get("/win", function(req, res) {
  res.render('win', {});
});

// req.body.gueess <---- link with form name = ""
// push the letter guess to thr array
router.post('/', function (req, res, next) {
  userGuessed.push(req.body.guess)
    userPoint = userPoint - 1
    if (userPoint === 0) {
    res.redirect("/lose")
  }
  res.redirect('/')
})

// This is the code I try and fail
// // from computer select random word.
// const randomWord = words.randomWord
// console.log(randomWord)
// // split random word to each sigle letter strin.
// let randomWordSplit = randomWord.split("")
// console.log(randomWordSplit)
//
// // user guess letter for "", add them together to []
// let userguess = []
// let userguess2 = ""
// //user have 8 times to guess
// let userLives = 8
//
// /// make emptu dash to show up index page
// let randomWordArray = []
// function dash() {
//    randomWordArray = randomWordSplit
//    for (let i = 0 ; i < randomWordSplit.length; i++){
//        randomWordArray.length = randomWordSplit.length;
//     //    randomWordArray.push('a',"_");
//    }
// }
//  console.log(randomWordArray)
// function checkPoint() {
//     for (let i = 0; i < randomWord.length; i++) {
//     if (randomWordSplit[i] === randomWordSplit[i]) {
//         console.log("You live!")
//     } else if (randomWordSplit[i] !== randomWordSplit[i]){
//         userLives - 1
//     } else if (userLives = 0) {
//       alert (" Game over!")
//     }
//     }
// }

module.exports = router;
