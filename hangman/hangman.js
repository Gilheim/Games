const prompt = require('prompt-sync')();
const words = require('word-list-json')


const makeHiddenWord = (word) => {
    let length = word.length
    let hideWord = ""
    for(i=0; i < length; i++) {
        hideWord += "_ "
    }
    return hideWord
}

const randomWord = () => {
    let idx = Math.floor(Math.random()*words.length)
    if(words[idx]<= 2){
        return randomWord()
    } else {
        return words[idx]
    }
}



const startGame = () => {
    let secretWord = randomWord()
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
    let secretWord = randomWord()
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

const displayHangman = (numOfGuesses) => {
    if (numOfGuesses == 6){
        console.log("|_____")
        return
    } else if(numOfGuesses == 5) {
        console.log("|")
        console.log("|    ")
        console.log("|    ")
        console.log("|    ")
        console.log("|_____")
        return
    } else if (numOfGuesses == 4) {
        console.log("|----|")
        console.log("|    ")
        console.log("|    ")
        console.log("|    ")
        console.log("|_____")
        return
    } else if (numOfGuesses == 3) {
        console.log("|----|")
        console.log("|    O")
        console.log("|    ")
        console.log("|    ")
        console.log("|_____")
        return
    } else if (numOfGuesses == 2) {
        console.log("|----|")
        console.log("|    O")
        console.log("|    |")
        console.log("|    ")
        console.log("|_____")
        return
    } else if (numOfGuesses == 1) {
        console.log("|----|")
        console.log("|   _O_")
        console.log("|    |")
        console.log("|    ")
        console.log("|_____")
        return
    } else if (numOfGuesses == 0) {
        console.log("|----|")
        console.log("|   _O_")
        console.log("|    |")
        console.log("|   / \\\ ")
        console.log("|_____")
        return
    } else {
        return
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
                    displayHangman(numOfGuesses)
                    return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
                } else {
                    console.log(`You have ${numOfGuesses} guess left`)
                    displayHangman(numOfGuesses)
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
                displayHangman(numOfGuesses)
                return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
            } else if (numOfGuesses == 1) {
                console.log(`You have ${numOfGuesses} guess left`)
                displayHangman(numOfGuesses)
                return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
            } else {
                console.log("You have no guesses left")
                displayHangman(numOfGuesses)
                console.log("You lose")
                console.log(`The word was ${secretWord}`)
                return restartGame()
            }
        }
    } else if (checkGuess(userGuess, guesses) == "same guess") {
        console.log(`You have already guessed ${userGuess}. Please try again`)
        console.log(`Letters guessed so far: ${guesses.sort()}`)
        return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
    } else {
        console.log(`Sorry, ${userGuess} is an unrecognised input. Please try again`)
        return guessFunc(secretWord, displayWord, guesses, numOfGuesses)
    }
}

startGame()