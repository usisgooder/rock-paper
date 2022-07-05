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
            console.error("Can't find winner");
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
    let playerScore = mapper[playerSelection].distToNode(computerSelection),
    computerScore = mapper[computerSelection].distToNode(playerSelection);
    if (playerScore < computerScore) {
        return `Player wins! ${playerSelection} wins ${computerSelection}`;
    }
    else if (playerScore === computerScore) {
        return `Draw! Both picked (${playerSelection}, ${computerSelection})`;
    } else {
        return `Computer wins! ${computerSelection} wins ${playerSelection}`;
    }
}

function game() {
    for (var i = 0; i < 5; i++) {
        var playerSelection = prompt();
        console.log(playRound(playerSelection, 'paper'));
    }
}

game();
