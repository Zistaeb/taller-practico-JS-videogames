const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame () {
    //game.fillRect(0,0,100,100);
    //game.clearRect(0,0,50,100);

    game.font = '25px Verdana';
    game.fillStyle = 'purple';
    game.textAlign = 'left';                  //start, end, center, rigth, left
    game.fillText('Platzi', 25, 25);
};
