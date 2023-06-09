const prompt = require('prompt-sync')();


let secretWord = "substantiation"
let guesses = []
let numOfGuesses = 7

const makeHiddenWord = (word) => {
    let length = word.length
    let hideWord = ""
    for(i=0; i < length; i++) {
        hideWord += "_ "
    }
    return hideWord
}

let displayWord = makeHiddenWord(secretWord)

const checkGuess = (guess) => {
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    if (alphabet.includes(guess.toLowerCase())) {
        if(guesses.includes(guess.toLowerCase()) == false) {
            return true
        } else {
            return "same guess"
        }
    } else {
        return false 
    }
}

const checkWin = (word) => {
    if(word.includes("_") === false) {
        return true 
    } else {
        return false
    }
}

const guessFunc = () => {
    console.log(displayWord)
    const userGuess = prompt('Guess a letter   >    ')
    if (checkGuess(userGuess) === true) {
        if (secretWord.includes(userGuess.toLowerCase())){
            console.log("Good guess")
            replaceLetters(userGuess.toLowerCase())
            if(!checkWin(displayWord)) {
                if(numOfGuesses > 1){
                    console.log(`You have ${numOfGuesses} guesses left`)
                    return guessFunc()
                } else {
                    console.log(`You have ${numOfGuesses} guess left`)
                    return guessFunc()
                }
            } else {
                console.log(`YOU WIN!! The word was ${secretWord}`)
                return
            }
        } else {
            console.log("Bad guess")
            guesses.push(userGuess.toLowerCase())
            numOfGuesses--
            if(numOfGuesses > 1){
                console.log(`You have ${numOfGuesses} guesses left`)
                return guessFunc()
            } else if (numOfGuesses == 1) {
                console.log(`You have ${numOfGuesses} guess left`)
                return guessFunc()
            } else {
                console.log("You have no guesses left")
                console.log("You lose")
                return
            }
        }
    } else if (checkGuess(userGuess) == "same guess") {
        console.log(`You have already guessed ${userGuess}. Please try again`)
        return guessFunc()
    } else {
        console.log(`Sorry, ${userGuess} is an unrecognised input. Please try again`)
        return guessFunc()
    }
}

const replaceLetters = (letter) => {
    let i = 0
    guesses.push(letter)
    let newDisplayWord = ""
    while (i < secretWord.length) {
        if(guesses.includes(secretWord[i])){
            newDisplayWord += `${secretWord[i]} `
        } else {
            newDisplayWord += `_ ` 
        }
        i++
    }
    displayWord = newDisplayWord
    return displayWord
}


guessFunc()