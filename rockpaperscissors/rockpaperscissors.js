const c = require('ansi-colors');

const prompt = require('prompt-sync')();


let lifeScores = {
    wins: 0,
    draws: 0,
    losses: 0
}



//Function deciding how the computer responds
const oppResponse = () => {
    let rps = ["rock", "paper", "scissors"]
    let decider = Math.floor(Math.random()*3)
    let response = rps[decider]
    return response
}

//Function to evaluate who won and update the scores
const whoWins = (user, computer) => {
    if (user === computer) {
        Object.keys(lifeScores).forEach((item) => {
            if(item === "draws") {
                lifeScores[item] += 1
            }
        })
        return c.yellow(`Computer chose ${computer}. It's a tie!`)
    } else if (user == "rock" && computer ==="paper" || user == "paper" && computer === "scissors" || user == "scissors" && computer === "rock"){
        Object.keys(lifeScores).forEach((item) => {
            if(item === "losses") {
                lifeScores[item] += 1
            }
        })
        return c.red(`Computer chose ${computer}. You lose!`)
    } else if((computer === "rock" && user == "paper" || computer === "paper" && user == "scissors" || computer === "scissors" && user == "rock")) {
        Object.keys(lifeScores).forEach((item) => {
            if(item === "wins") {
                lifeScores[item] += 1
            }
        })
        return c.green(`Computer chose ${computer}. You win!`)
    } else {
        console.log("Something went wrong...")
    }
}

//New game function. Also is used for player to check their stats
const resetGame = () => {
    let newGame = prompt('Another game? Or type stats to see your stats. (y/n)   >   ')
    if (newGame.toLowerCase()  === "y" || newGame.toLowerCase() === "yes"){
        //console.log(newGame)
        //console.log(stats())
        return game()
    } else if(newGame.toLowerCase()  === "n" || newGame.toLowerCase() === "no") {

    } else if(newGame.toLowerCase() === "stats") {
        console.log(stats())
        return resetGame()
   
    } else {
        console.log(`Sorry, ${newGame} is an unrecognised input. Please try again`)
        return resetGame()
    }
}

//function to check user input is valid
const isValid = (input) => {
    let acceptableInputs = ["r","p","s","rock","paper","scissors"]
    let placeHolder = input
    
    if(acceptableInputs.includes(input.toLowerCase()) ) {
        return true
    } else {
        console.log(`Sorry, ${placeHolder} is an unrecognised input. Please try again`)
        return false
    }
}




//Game function
const game = () => {  
    const userInput = prompt(`Enter "rock", "paper" or "scissors"!   >   `)
    if (isValid(userInput)) {
        let compResp = oppResponse()
        console.log(whoWins(userInput.toLowerCase(), compResp))
        return resetGame()
    } else {
        return game()
        
    }
        
    
}

//Function to return user stats
const stats = () => {
    return lifeScores
}

//starts the game
const startGame = () => {
    let userStart = prompt('Fancy a game of Rock, Paper Scissors? (y/n)   >   ');
    //console.log(userStart)
    if (userStart.toLowerCase() === "y" || userStart.toLowerCase() === "yes") {
        return game()
    } else if (userStart.toLowerCase() === "n" || userStart.toLowerCase() === "no") {
        return
    } else {
        console.log(`Sorry, ${userStart} is an unrecognised input. Please try again`)
        return startGame()
    }

}





startGame()







//console.log(oppResponse())
