class Game{
    constructor(playersGuess = null){
        this.playersGuess = playersGuess;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference(){
        return Math.abs(this.playersGuess - this.winningNumber)
    }
    isLower(){
        return this.playersGuess < this.winningNumber;
    }
    playersGuessSubmission(guess){
        const statusMessage = document.getElementById('status-message')

        if(guess > 100 || guess < 1 || typeof guess != 'number' || guess === ''){statusMessage.textContent = 'That is an invalid guess.'} else {
        this.playersGuess = guess;
        statusMessage.textContent = this.checkGuess();
        console.log(this.playersGuess);
        console.log(this.pastGuesses);
        }
        const hintMessage = document.querySelector('#hint-message')
        hintMessage.textContent = '...click the hint button if you need a little help!'
    }
    checkGuess(){
        let result = "";
        let diff = this.difference();
        
        if(diff === 0){
            result = `You Win! The winning number was ${this.winningNumber}.`;
            this.pastGuesses.push(this.playersGuess);
        }else if(this.pastGuesses.includes(this.playersGuess)){
            result = 'You have already guessed that number.'
        } else {
            this.pastGuesses.push(this.playersGuess);
            if(this.pastGuesses.length === 5){
                result = `You Lose. The winning number was ${this.winningNumber}.`
            } else {
                if(diff < 10) {
                    result = "You're burning up!";
                    if(this.playersGuess < this.winningNumber){
                       result += `...Guess higher.`
                    }
                    else {
                        result += `...Guess lower.`
                    }
                }
                else if(diff < 25) {
                    result = "You're lukewarm.";
                    if(this.playersGuess < this.winningNumber){
                        result += `..Guess higher.`
                     }
                     else {
                         result += `..Guess lower.`
                     }
                }
                else if(diff < 50) {
                    result = "You're a bit chilly."
                    if(this.playersGuess < this.winningNumber){
                        result += ` Guess higher...`
                     }
                     else {
                         result += ` Guess lower...`
                     }
                }
                else {
                result = "You're ice cold!"
                if(this.playersGuess < this.winningNumber){
                    result += ` Guess higher...`
                 }
                 else {
                     result += ` Guess lower...`
                 }
            }
            }
        }
        console.log(result)
        document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).textContent = this.playersGuess;
        return result;
    }
    
     provideHint(){
        let hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
        let shuffledHints = shuffle(hintArray);
        const hintMessage = document.querySelector('#hint-message')
        hintMessage.textContent = `The winning number is either ${shuffledHints[0]}, ${shuffledHints[1]}, or ${shuffledHints[2]}.`
     }
}

/*-------------AUXILARY FUNCTIONS-------------*/

function generateWinningNumber(){
    return Math.floor(Math.random() * 100)+ 1
}

function shuffle(array){
    let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

//my possibly incorrect way of restarting the game
function playAgain(){
    location.reload();
    return false;
}

//conditions for running the game
function newGame(){
    const game = new Game()

    const submitGuess = document.getElementById('submit');
    //target the submit button, add eventListenter
    submitGuess.addEventListener("click", e => {
       //keycode = 13
       //targeting the players input, turn it into a number
       const playersGuess = Number(document.getElementById('input-number').value);
       game.playersGuessSubmission(playersGuess);
       document.getElementById('input-number').value = ''; 
       
       console.log(playersGuess);
    });

    const getHint = document.querySelector('#get-hint');
    getHint.addEventListener("click", e => {
        game.provideHint()
    })
    console.log(game)
}
newGame()



