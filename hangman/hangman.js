const prompt = require('prompt-sync')();




const makeHiddenWord = (word) => {
    let length = word.length
    let hideWord = ""
    for(i=0; i < length; i++) {
        hideWord += "_ "
    }
    return hideWord
}



const startGame = () => {
    let secretWord = "substantiation"
    let guesses = []
    let numOfGuesses = 7
    let displayWord = makeHiddenWord(secretWord)
    const userStart = prompt('Fancy a game of hangman?  (y/n)    >     ')
    if (userStart.toLowerCase() === "y" || userStart.toLowerCase() === "yes") {
        return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
    } else if (userStart.toLowerCase() === "n" || userStart.toLowerCase() === "no") {
        return
    } else {
        console.log(`Sorry, ${userStart} is an unrecognised input. Please try again`)
        return startGame()
    }
}

const restartGame = () => {
    let secretWord = "substantiation"
    let guesses = []
    let numOfGuesses = 7
    let displayWord = makeHiddenWord(secretWord)
    const userStart = prompt('Another game?  (y/n)    >     ')
    if (userStart.toLowerCase() === "y" || userStart.toLowerCase() === "yes") {
        return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
    } else if (userStart.toLowerCase() === "n" || userStart.toLowerCase() === "no") {
        return
    } else {
        console.log(`Sorry, ${userStart} is an unrecognised input. Please try again`)
        return restartGame()
    }
}



const checkGuess = (guess, guesses) => {
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

const replaceLetters = (letter, guesses, displayWord, secretWord) => {
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

const guessFunc = (secretWord, displayWord, guesses, numOfGuesses) => {
    console.log(displayWord)
    const userGuess = prompt('Guess a letter   >    ')
    if (checkGuess(userGuess, guesses) === true) {
        if (secretWord.includes(userGuess.toLowerCase())){
            console.log("Good guess")
            displayWord = replaceLetters(userGuess.toLowerCase(), guesses, displayWord,secretWord)
            if(!checkWin(displayWord)) {
                if(numOfGuesses > 1){
                    console.log(`You have ${numOfGuesses} guesses left`)
                    return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
                } else {
                    console.log(`You have ${numOfGuesses} guess left`)
                    return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
                }
            } else {
                console.log(`YOU WIN!! The word was ${secretWord}`)
                return restartGame()
            }
        } else {
            console.log("Bad guess")
            guesses.push(userGuess.toLowerCase())
            numOfGuesses--
            if(numOfGuesses > 1){
                console.log(`You have ${numOfGuesses} guesses left`)
                return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
            } else if (numOfGuesses == 1) {
                console.log(`You have ${numOfGuesses} guess left`)
                return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
            } else {
                console.log("You have no guesses left")
                console.log("You lose")
                return restartGame()
            }
        }
    } else if (checkGuess(userGuess, guesses) == "same guess") {
        console.log(`You have already guessed ${userGuess}. Please try again`)
        return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
    } else {
        console.log(`Sorry, ${userGuess} is an unrecognised input. Please try again`)
        return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
    }
}

startGame()