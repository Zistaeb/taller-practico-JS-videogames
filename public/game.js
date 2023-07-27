const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

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

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = Math.floor(window.innerWidth * 0.8);
    } else {
        canvasSize = Math.floor(window.innerHeight * 0.8);
    };

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize/10;

    startGame();
};

function startGame () {
    console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {                                        //Si no hay ninguna otra posicion, dentro del arreglo mapa
        gameWin();
        return;
    };

    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split('')); //arreglo bidimensional
    console.log(map, mapRows, mapRowCols);

    enemyPositions = [];
    game.clearRect(0, 0, canvasSize, canvasSize);

    mapRowCols.forEach( (row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if (col == "O") {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX, 
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
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    };

    const enemyCollision = enemyPositions.find((enemy) => {
        const enemyCollisionX =  enemy.x == playerPosition.x.toFixed(3);
        const enemyCollisionY =  enemy.y == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        console.log("Chocaste contra un enemigo :(");
    };

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin () {
    console.log("Subiste de nivel :)");
    level++;
    startGame();
};

function gameWin (params) {
    console.log('Terminaste el juego!!!');
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
