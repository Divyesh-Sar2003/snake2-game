const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX, snakeY; 
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalID ;
let score = 0;
//getting high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High-Score : ${highScore}`;

const changeFoodPosition = () => {
    //passing a random 0-30 value as food position 
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}
const changeHeadPosition = () => {
    //passing a random 0-30 value as snake-head position 
    snakeX = Math.floor(Math.random() * 30) + 1;
    snakeY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => 
{   //clearing the timer and realoding the page on game over
    clearInterval(setIntervalID);``
    alert ("Game Over! Press ok to Replay.....");
    location.reload();
}

const changeDirection  = (e) =>
{
    //changing the direction of snake using key
    if(e.key ===  "ArrowUp" && velocityY != 1)
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown"  && velocityY != -1)
    {
        velocityX = 0;
        velocityY = 1;
    }
    
    else if(e.key === "ArrowLeft"  && velocityX != 1)
    {
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight"  && velocityX != -1)
    {
        velocityX = 1;
        velocityY = 0;
    }
   
}

const initGame = () => {
    if(gameOver) return handleGameOver();
   let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY)
    {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);// pushing food position t snake body array 
        score++; //increment score by 1 

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score : ${score}`;
        highScoreElement.innerText = `High-Score : ${highScore}`;
    }
    for (let i = snakeBody.length - 1; i>0; i--)
    {   ///shifting forward  the values of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }
    

snakeBody[0] = [snakeX, snakeY];
        //updating the snake head possition 
    snakeX += velocityX; 
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX >30 ||snakeY <= 0 || snakeY >30)
    {
        gameOver = true; 
    }


    for (let i =0; i < snakeBody.length; i++)
    {
        //add a ddiv for each part of the snakes body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        //checking if the snake head eat the body then set gameover 
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
        {
            gameOver = true;
        }
    }
   
   playBoard.innerHTML = htmlMarkup;
}

changeHeadPosition();
changeFoodPosition();
setIntervalID =  setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);