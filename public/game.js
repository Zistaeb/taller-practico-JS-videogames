const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector("#lives");
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

const playerPosition = {                    // Igual a objeto que tendra 2 posiciones
    x: undefined,
    y: undefined
};

const giftPosition = {
    x: undefined,
    y: undefined
};

let enemyPositions = [];

let elementsSize;
let canvasSize;
let level = 0;
let lives = 3;
let timeStart;
let timePlayer;
let timeInterval;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function fixNumber(n) {
    return Number(n.toFixed(2));
};

function setCanvasSize() {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = Math.floor(window.innerWidth * 0.8);
    } else {
        canvasSize = Math.floor(window.innerHeight * 0.8);
    };

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize/10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
};

function startGame () {
    console.log({canvasSize, elementsSize});
    console.log(window.innerWidth, window.innerHeight);

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {                                        //Si no hay ninguna otra posicion, dentro del arreglo mapa
        gameWin();
        return;
    };

    if(!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    };

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split('')); //arreglo bidimensional
    console.log(map, mapRows, mapRowCols);

    showLives();

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach( (row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if (col == "O") {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX; 
                    playerPosition.y = posY;
                    console.log({playerPosition}); 
                };
            } else if (col == "I") {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == "X") {
                enemyPositions.push({
                    x: posX,
                    y: posY
                });
            }

            game.fillText(emoji, posX, posY);
        });
    });

    movePlayer();

    /*for(let row = 1; row <=10; row++ ) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
    };*/

    
     //window.innerHeight
     //window.innerWidth

    //game.fillRect(0,0,100,100);
    //game.clearRect(0,0,50,100);

    //game.font = '25px Verdana';
    //game.fillStyle = 'purple';
    //game.textAlign = 'left';                  //start, end, center, rigth, left
    //game.fillText('Platzi', 25, 25);
};

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(0) == giftPosition.x.toFixed(0);
    const giftCollisionY = playerPosition.y.toFixed(0) == giftPosition.y.toFixed(0);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    };

    const enemyCollision = enemyPositions.find((enemy) => {
        const enemyCollisionX =  enemy.x == playerPosition.x.toFixed(0);
        const enemyCollisionY =  enemy.y == playerPosition.y.toFixed(0);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    };

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
};

function levelWin () {
    console.log("Subiste de nivel :)");
    level++;
    startGame();
};

function levelFail () {
    console.log("Chocaste contra un enemigo :(");
    lives--;
    
    if (lives <= 0) {
        level = 0;
        lives = 3;  
        timeStart = undefined; 
    }; 

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame(); 
};

function gameWin (params) {
    console.log('Terminaste el juego!!!');
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now() - timeStart;

    if (recordTime) { 
        if (recordTime >= playerTime) {
            localStorage.setItem("record_time", playerTime);
            pResult.innerHTML = "Superaste el reto :)";
            clearTimeout("#time", undefined);
        } else {
            pResult.innerHTML = "Lo siento, no superaste el reto :(";
            clearTimeout("#time", undefined);
        };
    } else {
        localStorage.setItem("record_time", playerTime);
        pResult.innerHTML = "Primera vez jugando?, pero ahora trata de superar tu tiempo :)";
    };

    console.log({recordTime, playerTime});
};

function showLives() {
    const heartsArrays = Array(lives).fill(emojis['HEART']);           //[1,2,3]
    //console.log(heartsArrays);

    spanLives.innerHTML = "";
    heartsArrays.forEach(heart => spanLives.append(heart));
};

function showTime () {
    spanTime.innerHTML = Date.now() - timeStart;
};

function showRecord () {
    spanRecord.innerHTML = localStorage.getItem("record_time");
};

window.addEventListener('keydown', moveByKeys);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == "ArrowUp") moveUp();
    else if (event.key == "ArrowLeft") moveLeft();
    else if(event.key == "ArrowRight") moveRight();
    else if (event.key == "ArrowDown") moveDown();
};

function moveUp() {
    console.log('Me quiero mover hacia arriba');

    if((playerPosition.y - elementsSize) < elementsSize) {
        console.log("OUT");
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }    
};

function moveLeft() {
    console.log('Me quiero mover hacia izquierda');

    if((playerPosition.x - elementsSize) < elementsSize) {
        console.log("OUT");
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }   
};

function moveRight() {
    console.log('Me quiero mover hacia derecha');

    if((playerPosition.x + elementsSize) > canvasSize) {
        console.log("OUT");
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }   
};

function moveDown() {
    console.log('Me quiero mover hacia abajo');

    if((playerPosition.y + elementsSize) > canvasSize) {
        console.log("OUT");
    } else {
        playerPosition.y += elementsSize;
        startGame();
    } 
};
