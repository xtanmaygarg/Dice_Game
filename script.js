/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, activePlayer, currRoundScore, gameOn

function init() {
  scores = [0, 0]
  currRoundScore = 0
  activePlayer = 0
  gameOn = true

  // Reset All Visual Scores To Zero.
  document.getElementById('name-0').textContent = 'Player 1'
  document.getElementById('name-1').textContent = 'Player 2'
  document.getElementById('score-0').textContent = '0'
  document.getElementById('score-1').textContent = '0'
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')
  document.querySelector('.player-0-panel').classList.add('active')

}

// Initialize Game
init()

// document.querySelector('.dice').style.display = 'none'

document.querySelector('.btn-new').addEventListener('click', init)

function nextPlayerTurn() {
  currRoundScore = 0
  document.getElementById(`current-${activePlayer}`).textContent = '0'
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

  // Change The Active Player
  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')
}

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gameOn){
    // Roll Dice
    let rollDice = Math.floor(Math.random() * 6) + 1

    // Update Dice Image:
    let diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block'
    diceDOM.src = `dice-${rollDice}.png`

    // Update Current Round Score:
    if (rollDice === 1){
      nextPlayerTurn()
    }
    else{
      currRoundScore += rollDice
      document.querySelector(`#current-${activePlayer}`).textContent = currRoundScore
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gameOn){
    scores[activePlayer] += currRoundScore
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]

    // Check Winner:
    if (scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!'
      document.querySelector('.dice').style.display = 'none'
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
      gameOn = false
    }
    else {
      nextPlayerTurn()
    }
  }
})
