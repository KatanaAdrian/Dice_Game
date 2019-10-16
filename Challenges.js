/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, dice1, i;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        // 1. Random nr
        var  dice = Math.floor(Math.random() * 6) + 1;
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if( dice === 6 && lastDice === 6){   
            scores[activePlayer] = 0;
            document.getElementById('score-' +activePlayer).textContent = '0';

            console.log('dice = ' + dice);

            nextPlayer();
            lastDice = -1;

        }
        // 3. Update the round score if the rolled nr was not a 1
        else{ if(dice > 1 ){



            //dice1 += dice;
            roundScore += dice;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            //document.getElementById('current-' + activePlayer).textContent = dice1;

            console.log('e = ' + roundScore);

        }
             else{
                 lastDice = -1;
                 nextPlayer();

             }
             lastDice = dice;

            }
    }});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // add current score to global score
        scores[activePlayer] += roundScore

        //update ui 
        document.getElementById('score-' +activePlayer).textContent = scores[activePlayer];
        //check if the player won the game

        
        var input =document.querySelector('.final-score').value;
        
        if(input) {
            
        }
        
        if(scores[activePlayer] >= 50){
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display= 'none';
}

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    dice1 = 0;
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

}


