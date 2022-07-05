class Node {
    constructor(name) {
        this.name = name;
        this.edge = null;
    }
    distToNode(name) {
        let MAX_DIST = 999;
        let dist = 0;
        let current = this;
        while (current.name !== name || dist === MAX_DIST) {
            current = current.edge;
            dist += 1;
        }
        if (dist === MAX_DIST) {
            throw "Can't find winner";
        }
        return dist;
    }
}

const options = ['rock', 'scissors', 'paper'];
const mapper = Object.fromEntries(
    options.map(option => [option, new Node(option)])
);

for (var i = 0; i < options.length; i++) {
    mapper[options[i]].edge = mapper[options[(i + 1) % options.length]];
}

function computerPlay() {
    return options[Math.floor(Math.random() * options.length)];
}

function playRound(playerSelection, computerSelection) {
    console.log(playerSelection, computerSelection)
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    let playerDist = mapper[playerSelection].distToNode(computerSelection),
        computerDist = mapper[computerSelection].distToNode(playerSelection);
    if (playerDist < computerDist) {
        playerScore++;
        return `Player wins! ${playerSelection} wins ${computerSelection}`;
    }
    else if (playerDist === computerDist) {
        return `Draw! Both picked (${playerSelection}, ${computerSelection})`;
    } else {
        computerScore++;
        return `Computer wins! ${computerSelection} wins ${playerSelection}`;
    }
}

function game(playerSelection) {
    const computerSelection = computerPlay();
    resultDisplay.innerHTML = playRound(playerSelection, computerSelection);;
    playerScoreDisplay.innerHTML = playerScore.toString();
    computerScoreDisplay.innerHTML = computerScore.toString();
    selectionDisplay.innerHTML = `<li>Computer selected: ${computerSelection}</li> <li>Player selected: ${playerSelection}</li>`;
    if (Math.max(playerScore, computerScore) === maxScore) {
        let winner = playerScore === maxScore ? "Player" : "Computer";
        alert(`${winner} is the winner!`);
        document.querySelectorAll('button').forEach(elem => elem.onclick = null);
    }
}

var playerScore = 0, computerScore = 0;
const maxScore = 5;
const playerScoreDisplay = document.querySelector('.player-score');
const computerScoreDisplay = document.querySelector('.computer-score');
const resultDisplay = document.querySelector('.result');
const selectionDisplay = document.querySelector('.selection');
document.querySelectorAll('button').forEach(elem => elem.onclick = () => {game(elem.textContent);});

