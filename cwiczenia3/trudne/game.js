var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;
var time = 180;

var drawBallAnimation = null;
var timeInterval = null;
var countingInterval = null;

var numOfPlayers = 1;
var players = [numOfPlayers];
var colors = ["#0095DD","#FF00FF"];

var numOfSquares = 11
var squares = [numOfSquares];
var squareSize = 30;
var speedOfCounting = 1000;

var timeArea = document.getElementById("time");

class Player
{
    constructor(nick, color, x, y, nickArea, pointsArea)
    {
        this.nick = nick;
        this.points = 0;
        this.ballX = x;
        this.ballY = y;
        this.dx = 0;
        this.dy = 0;
        this.moveValue = 1;
        this.keysPressed = [false, false, false, false];
        this.color = color;
        this.nickArea = nickArea;
        this.nickArea.innerHTML = this.nick;
        this.nickArea.style.backgroundColor = this.color;
        this.pointsArea = pointsArea;
        this.pointsArea.innerHTML = 0;
    }
}

class Square
{
    constructor(x, y)
    {
        this.speedOfCounting  = parseInt(Math.random() * 2700 + 300);
        this.timeOfLiving = parseInt(Math.random() * 15 + 5);
        this.currentNumber = this.timeOfLiving;
        this.x = x;
        this.y = y;
        this.color = "#00e600";
        this.interval = null;
    }
    
    countDown()
    {
        this.currentNumber--;
        if (this.currentNumber < 0)
        {
            this.color = "#ff3300";
        }
        if (Math.abs(squares[i].currentNumber) > squares[i].timeOfLiving)
        {
            clearInterval(squares[i].interval);
            delete squares[i];
            squares.splice(i, 1);
            createSquares(1);
        }
    }
}

function keyDownHandler(e) {
    switch (e.keyCode) {
        case 37:
            players[0].keysPressed[0] = true;
            break;
        case 38:
            players[0].keysPressed[1] = true;
            break;
        case 39:
            players[0].keysPressed[2] = true;
            break;
        case 40:
            players[0].keysPressed[3] = true;
            break;
        case 65:
            players[1].keysPressed[0] = true;
            break;
        case 87:
            players[1].keysPressed[1] = true;
            break;
        case 68:
            players[1].keysPressed[2] = true;
            break;
        case 83:
            players[1].keysPressed[3] = true;
            break;
    }
}

function keyUpHandler(e) {
    switch (e.keyCode) {
        case 37:
            players[0].keysPressed[0] = false;
            break;
        case 38:
            players[0].keysPressed[1] = false;
            break;
        case 39:
            players[0].keysPressed[2] = false;
            break;
        case 40:
            players[0].keysPressed[3] = false;
            break;
        case 65:
            players[1].keysPressed[0] = false;
            break;
        case 87:
            players[1].keysPressed[1] = false;
            break;
        case 68:
            players[1].keysPressed[2] = false;
            break;
        case 83:
            players[1].keysPressed[3] = false;
            break;
    }
}

function drawBalls()
{
    for (i=0; i<numOfPlayers; i++)
    {
        ctx.beginPath();
        ctx.arc(players[i].ballX, players[i].ballY, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = players[i].color;
        ctx.fill();
        ctx.closePath();
    }
}


function drawSquares()
{
    for(i=1; i<numOfSquares; i++)
    {
        ctx.beginPath();
        ctx.rect(squares[i].x, squares[i].y, squareSize, squareSize);
        ctx.fillStyle = squares[i].color;
        ctx.fill();
        ctx.strokeText(squares[i].currentNumber, squares[i].x + squareSize/2, squares[i].y + squareSize/2);
        ctx.closePath();
    }
}

function checkBallPosition()
{
    for (i=0; i<numOfPlayers; i++)
    {
        if (players[i].ballX < 0) players[i].ballX = canvas.width;
        if (players[i].ballX > canvas.width) players[i].ballX = 0;
        if (players[i].ballY < 0) players[i].ballY = canvas.height;
        if (players[i].ballY > canvas.height) players[i].ballY = 0;
    }
}

function checkDirections()
{
    for (i=0; i<numOfPlayers; i++)
    {
        if (!players[i].keysPressed[1] && !players[i].keysPressed[3]) players[i].dy = 0;
        if (!players[i].keysPressed[0] && !players[i].keysPressed[2]) players[i].dx = 0;
        
        if (players[i].keysPressed[0]) players[i].dx = -players[i].moveValue;
        if (players[i].keysPressed[2]) players[i].dx = players[i].moveValue;
        if (players[i].keysPressed[3]) players[i].dy = players[i].moveValue;
        if (players[i].keysPressed[1]) players[i].dy = -players[i].moveValue;
    }
}

function checkCollisions(x, y, i)
{
    //collisions with ball
    for(j=0; j<numOfPlayers; j++)
    {
        X = Math.abs(x + (squareSize/2) - players[j].ballX);
        Y = Math.abs(y + (squareSize/2) - players[j].ballY);
        if (Math.sqrt((X*X) + (Y*Y)) < (ballRadius + (squareSize/2))) return false;
    }

    //collisions with others squares
    for(j=1; j<squares.length; j++)
    {
        X = Math.abs((squares[j].x + squareSize/2) - (x + squareSize/2))
        Y = Math.abs((squares[j].y + squareSize/2) - (y + squareSize/2))
        if (Math.sqrt((X*X) + (Y*Y)) < (squareSize * Math.sqrt(2))) return false;
    }
    return true;
}

function checkCrossingWithSquares()
{
    for(k=0; k<numOfPlayers; k++)
    {
        for(j=1; j<numOfSquares; j++)
        {
            X = Math.abs(squares[j].x + squareSize/2 - players[k].ballX)
            Y = Math.abs(squares[j].y + squareSize/2 - players[k].ballY)
            if (Math.sqrt((X*X) + (Y*Y)) < (ballRadius + (squareSize/2)))
            {
                for(i = 1; i < numOfSquares; i++){ 
                    if ( squares[i] == squares[j]) {
                        clearInterval(squares[j].interval);
                        players[k].points += squares[j].currentNumber;
                        players[k].pointsArea.textContent = players[k].points;
                        delete squares[j];
                        squares.splice(i, 1);
                        createSquares(1);
                    }
                }
                break;
            }
        }
    }
}

function countDown()
{
    for(i=1; i<numOfSquares; i++)
    {
        squares[i].countDown();
    }
}

function createSquares(n)
{
    for (i=0; i<n; i++)
    {
        do
        {
            x = parseInt(Math.random() * (canvas.width - squareSize));
            y = parseInt(Math.random() * (canvas.height - squareSize));
        } while (!checkCollisions(x, y, i));
        var newSquare = new Square(x, y);
        squares.push(newSquare);
    }
}

function createPlayers()
{
    for(i=0; i<numOfPlayers; i++)
    {
        var x = ((numOfPlayers-i)*canvas.width)/(numOfPlayers+1);
        var y = canvas.height/2;
        var nick = sessionStorage.getItem("nick"+(i+1));
        var nickArea = document.getElementById("nick" + i);
        var pointsArea = document.getElementById("points" + i);
        if (nickArea == null)
        {
            var gameBoard = document.getElementById("gameBoard");
            gameBoard.innerHTML += "<tr><td id=\"nick" + i + "\">" + nick + "</td><td id=\"points" + i + "\">0</td></tr>";
            var nickArea = document.getElementById("nick" + i);
            var pointsArea = document.getElementById("points" + i);
        }
        players[i] = new Player(nick, colors[i], x, y, nickArea, pointsArea);
    }
}

function timer()
{
    time--;
    timeArea.textContent = time;
    if (time % 60 == 0) 
    {
        for(i=0; i<numOfPlayers; i++)
        {
            players[i].moveValue++;
        }
            numOfSquares+=5;
            createSquares(5);
            speedOfCounting -= 300;
            clearInterval(countingInterval);
            countingInterval = setInterval(countDown, speedOfCounting);
    }
}

function updateBallPosition()
{
    for(i=0; i<numOfPlayers; i++)
    {
        players[i].ballX += players[i].dx;
        players[i].ballY += players[i].dy;
    }
}

function gameLoop()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBalls();
    drawSquares();
    updateBallPosition();
    checkBallPosition();
    checkDirections();
    checkCrossingWithSquares();
    drawBallAnimation = requestAnimationFrame(gameLoop);
}

function reset()
{
    players.splice(0,numOfPlayers);
    squares.splice(0,numOfSquares); 
    numOfSquares = 10;
    speedOfCounting = 1000;
    startGame();
}

function gameOver()
{
    cancelAnimationFrame(drawBallAnimation);
    clearInterval(timeInterval);
    clearInterval(countingInterval);
    window.alert("koniec gry");
    reset();
}

function startGame()
{
    numOfPlayers = parseInt(sessionStorage.getItem("numOfPlayers"));
    createPlayers();
    createSquares(numOfSquares);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    countingInterval = setInterval(countDown, speedOfCounting);
    drawBallAnimation = requestAnimationFrame(gameLoop);
    timeInterval = setInterval(timer, 1000);
    setTimeout(gameOver, 180500);
}