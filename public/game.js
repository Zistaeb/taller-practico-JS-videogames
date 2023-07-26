const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let elementsSize = 0;
let canvasSize = 0;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
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

    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log(map, mapRows, mapRowCols);

    for(let row = 1; row <=10; row++ ) {
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
    };

    
     //window.innerHeight
     //window.innerWidth

    //game.fillRect(0,0,100,100);
    //game.clearRect(0,0,50,100);

    //game.font = '25px Verdana';
    //game.fillStyle = 'purple';
    //game.textAlign = 'left';                  //start, end, center, rigth, left
    //game.fillText('Platzi', 25, 25);
};