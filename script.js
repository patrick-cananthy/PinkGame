'use strict'

//Selecting element
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const switchPlayer = function() {
    //Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0
    currentScore = 0
    activePlayer = activePlayer === 0 ? 1 : 0

}
let scores, currentScore, activePlayer, playing
const init = function() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true
    score0El.textContent = 0
    score1El.textContent = 0

    diceEl.classList.add('hidden');
    current0El.textContent = 0
    current1El.textContent = 0
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')

}
init()

//Starting condition
diceEl.classList.add('hidden')



//Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        //Display dice
        const dice = Math.trunc(Math.random() * 6) + 1
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`

        //3. Check for rolled 1
        if (dice != 1) {
            //Add dice to current score
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore

        } else {
            switchPlayer()


        }
    }
})

// Hold functionality
btnHold.addEventListener('click', function() {
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

        //Check if player score is >==100
        if (scores[activePlayer] >= 100) {
            playing = false
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        }

        //Switch to next palyer
        else {
            switchPlayer()
        }
    }

})
btnNew.addEventListener('click', init)