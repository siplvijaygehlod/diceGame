//global variables
var scores, roundScore, activePlayer, gamePlaying;

//dirst function is called
init();

function winner(player, diceVal) {
    if (player === 1)
        console.log(roundScore + diceVal + scores[player]);
    // Update the UI

    document.querySelector('#score-' + player).textContent = roundScore + diceVal + scores[player];

    document.querySelector('#name-' + player).textContent = 'Winner!';

    document.querySelector('.player-' + player + '-panel').classList.toggle('active');

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' + player + '-panel').classList.add('winner');
    document.querySelector('.player-' + player + '-panel').classList.add('active');
    document.querySelector('.player-' + Math.abs(player - 1) + '-panel').classList.remove('active');

    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    
    // stop the whole game
    gamePlaying = false;
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if ((roundScore + dice + scores[0]) >= 30) {
            winner(0, dice);
        } else if ((roundScore + dice + scores[1]) >= 30) {
            winner(1, dice);
        } else {
            // Update the round score if dice >1
            if (dice !== 1) {
                //Add score to round score and show
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                //Next player turn and update the score
                scores[activePlayer] += roundScore;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

                nextPlayer();
            }
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add current score to global score list
        scores[activePlayer] += roundScore;

        // Update the html page
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // if player won this game
        if (scores[activePlayer] >= 30) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';

            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
}