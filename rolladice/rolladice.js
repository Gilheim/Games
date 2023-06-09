//I've decided to make a simple version of the game craps for this
//You roll two dice and if they do not sum to seven you win
//Winner in this case will be the player who has the longest streak without losing
const prompt = require('prompt-sync')()


const rollADice = () => {
    return Math.floor(Math.random()*6) +1
}

const crapsScore = () => {
    let score = rollADice() + rollADice()
    return score
}

const didLose = (score) => {
    if(score == 7) {
        return true
    } else {
        return false
    }
}

const initialiseGame = () => {
    let userStart = prompt('Fancy a game of craps? (y/n)   >    ')
    if (userStart.toLowerCase() === "y" || userStart.toLowerCase() === "yes") {
        return startGame()
    } else if (userStart.toLowerCase() === "n" || userStart.toLowerCase() === "no") {
        return
    } else {
        console.log(`Sorry, ${userStart} is an unrecognised input. Please try again`)
        return initialiseGame()
    }
}

const startGame = () => {
    let streak = 0
    let userInput = prompt('Press "r" to roll your first dice    >    ')
    if(userInput.toLowerCase() == "r"){
        return game(streak)
    } else {
        console.log(`Sorry, ${userStart} is an unrecognised input. Please try again`)
        return startGame()
    }

}

const game = (playerCurrentScore) => {
    let streak = playerCurrentScore
    let score = crapsScore()
        if(didLose(score)){
            console.log('You rolled a 7')
            console.log("Your score is 0")
            console.log("The computer will now play")
            return setTimeout(computerPlayer, 2000, 0, 0)
        } else {
            streak++
            console.log(`You rolled a ${score}`)
            console.log(`Your current streak is ${streak}`)
            let playAgain = prompt('Press "r" to keep rolling, or "s" to save your streak    >    ')
            if(playAgain.toLowerCase() == "r") {
                return game(streak)
            } else if(playAgain.toLowerCase()== "s") {
                console.log(`Your final streak is ${streak}`)
                console.log(`The computer will now play`)
                return setTimeout(computerPlayer, 2000, streak, 0)
            }
        }
}

const computerPlayer = (playerScore, computerScore) => {
    let score = crapsScore()
    if(didLose(score)){
        console.log(`The computer rolled a ${score}`)
        if(playerScore != 0) {
            console.log(`YOU WIN!!`)
            const playAgain = prompt('Fancy another game (y/n)   >    ')
            if(playAgain.toLowerCase() === "y" || playAgain.toLowerCase() === "yes"){
                return startGame()
            } else if (playAgain.toLowerCase() === "n" || playAgain.toLowerCase() === "no"){
                return
            } else {
                return
            }
        } else {
            console.log("It's a tie!!")
            const playAgain = prompt('Fancy another game (y/n)   >    ')
            if(playAgain.toLowerCase() === "y" || playAgain.toLowerCase() === "yes"){
                return startGame()
            } else if (playAgain.toLowerCase() === "n" || playAgain.toLowerCase() === "no"){
                return
            } else {
                return
            }
        }
    } else {
        computerScore++
        console.log(`The computer rolled a ${score}`)
        console.log(`The computer's current score is ${computerScore}`)
        if(computerScore > playerScore) {
            console.log("The computer wins")
            const playAgain = prompt('Fancy another game (y/n)   >    ')
            if(playAgain.toLowerCase() === "y" || playAgain.toLowerCase() === "yes"){
                return startGame()
            } else if (playAgain.toLowerCase() === "n" || playAgain.toLowerCase() === "no"){
                return
            } else {
                return
            }

        } else {
            console.log("The computer is rolling again")
            return setTimeout(computerPlayer, 4000, playerScore, computerScore)
        }
        
    }
}



initialiseGame()