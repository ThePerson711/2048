let check = true;
let RanNum = 0;
let space = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
let score = 0;
let best_score= 0;
cfl = 0;
NewGame();

function CreateRandomNum() {
    check = true;
    while(check) {
        RanNum = Math.round(Math.random() * 16) + 1;
        if ( space[ RanNum % 4 ][ Math.round( (RanNum-1) / 4) ] === 0) {
            space[ RanNum % 4 ][ Math.round( (RanNum-1) / 4) ] = 2;
            check = false;
        }
    }
    Update();
}

function Update() {
    score = 0;
    for (let column = 0; column < 4; column++) {
        for (let row = 0; row < 4; row++) {          
            if (space[column][row] === 0) {
                document.getElementById(`${column+1}-${row+1}`).innerHTML = ``;
            } else {
            document.getElementById(`${column+1}-${row+1}`).innerHTML = 
                `${space[column][row]}`;
            }
            score += space[column][row];
            if (best_score < score) {
                best_score = score;
            }
            if (space[column][row] === 0) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: rgb(205, 189, 165);`;
            } else if (space[column][row] === 2) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #D2691E`;
            } else if (space[column][row] === 4) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #B8860B`;
            } else if (space[column][row] === 8) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #556B2F`;
            } else if (space[column][row] === 16) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color:#00CED1`;
            } else if (space[column][row] === 32) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #FF1493`;
            } else if (space[column][row] === 64) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #B22222`;
            } else if (space[column][row] === 128) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #228B22`;
            } else if (space[column][row] === 256) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #FFD700`;
            } else if (space[column][row] === 512) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #ADFF2F`;
            } else if (space[column][row] === 1024) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #FF69B4`;
            } else if (space[column][row] === 2048) {
                document.getElementById(`${column+1}-${row+1}`).style = 
                `background-color: #9370DB`;
            }
        }
    }
    document.getElementById(`score`).innerHTML = `${score}`;
    document.getElementById(`best-score`).innerHTML = `${best_score}`;
    CheckForLose();
}   

function CheckForLose() {
    cfl = 0;
    for (let column = 0; column < 4; column++) {
        for (let row = 0; row < 4; row++) {
            if (space[column][row] !== 0) {
                cfl++;
            }
        }
    }
    if (cfl === 16) {
        alert('You Lose!');
        NewGame();
    }
}

function NewGame() {
    for (let column = 0; column < 4; column++) {
        for (let row = 0; row < 4; row++) {
            space[column][row] = 0;
        }
    }
    score = 0;
    CreateRandomNum();
    CreateRandomNum();
}

document.addEventListener('keyup', Direction);
function Direction(event) {
    if (event.code === `ArrowUp`) {
        for (let column = 0; column < 4; column++) {
            for (let row = 1; row < 4; row++) {
                for (let times = row; times >= 1; times--) {
                    if (space[times-1][column] === 0) {
                        space[times-1][column] = space[times][column];
                        space[times][column] = 0;
                    } else if (space[times-1][column] === space[times][column]) {
                        space[times-1][column] *= 2;
                        space[times][column] = 0;
                    }
                }
            }
        }
    } else if (event.code === `ArrowDown`) {
        for (let column = 0; column < 4; column++) {
            for (let row = 2; row >= 0; row--) {
                for (let times = row; times <= 2; times++) {
                    if (space[times+1][column] === 0) {
                        space[times+1][column] = space[times][column];
                        space[times][column] = 0;
                    } else if (space[times+1][column] === space[times][column]) {
                        space[times+1][column] *= 2;
                        space[times][column] = 0;
                    }
                }
            }
        }
    } else if (event.code === `ArrowLeft`) {
        for (let column = 0; column < 4; column++) {
            for (let row = 1; row < 4; row++) {
                for (let times = row; times >= 1; times--) {
                    if (space[column][times-1] === 0) {
                        space[column][times-1] = space[column][times];
                        space[column][times] = 0;
                    } else if (space[column][times-1] === space[column][times]) {
                        space[column][times-1] *= 2;
                        space[column][times] = 0;
                    }
                }
            }
        }
    } else if (event.code === `ArrowRight`) {
        for (let column = 0; column < 4; column++) {
            for (let row = 2; row >= 0; row--) {
                for (let times = row; times <= 2; times++) {
                    if (space[column][times+1] === 0) {
                        space[column][times+1] = space[column][times];
                        space[column][times] = 0;
                    } else if (space[column][times+1] === space[column][times]) {
                        space[column][times+1] *= 2;
                        space[column][times] = 0;
                    }
                }
            }
        }
    }
    CreateRandomNum();
    Update();
}

document.getElementById(`block-panel`).addEventListener('mouseup',MouseMove);
function MouseMove(mm) {
    console.log(mm.button);
}