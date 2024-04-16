document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector(".game-canvas");
    const context = canvas.getContext("2d");
    const startButton = document.querySelector(".game-start");
    const resetButton = document.querySelector(".game-reset");
    const scoreDisplay = document.querySelector(".game-score");
  
    const snakeImage = new Image();
    snakeImage.src = "img/snake.png";
  
    const foodImage = new Image();
    foodImage.src = "img/cherry.png";
  
    const gridSize = 20;
    const gridSizeInPixels = canvas.width / gridSize;
  
    let snake = [{ x: 9, y: 9 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let score = 0;
    let isGameOver = true;
  
    function drawSnake() {
      snake.forEach((segment) => {
        context.drawImage(snakeImage, segment.x * gridSizeInPixels, segment.y * gridSizeInPixels, gridSizeInPixels, gridSizeInPixels);
      });
    }
  
    function drawFood() {
      context.drawImage(foodImage, food.x * gridSizeInPixels, food.y * gridSizeInPixels, gridSizeInPixels, gridSizeInPixels);
    }
  
    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawFood();
    }
  
    function moveSnake() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);
  
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = "Очки: " + score;
        spawnFood();
      } else {
        snake.pop();
      }
    }
  
    function spawnFood() {
      food = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
  
      // Ensure the food doesn't spawn inside the snake
      if (snake.some((segment) => segment.x === food.x && segment.y === food.y)) {
        spawnFood();
      }
    }
  
    function handleGameOver() {
      isGameOver = true;
      alert("Гра закінчилася. Ваш рахунок: " + score);
    }
  
    function checkCollision() {
      const head = snake[0];
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameLoop);
        handleGameOver();
      }
    }
  
    function startGame() {
      if (!isGameOver) return;
  
      snake = [{ x: 9, y: 9 }];
      dx = 0;
      dy = 0;
      score = 0;
      scoreDisplay.textContent = "Очки: " + score;
      isGameOver = false;
  
      spawnFood();
  
      gameLoop = setInterval(() => {
        moveSnake();
        checkCollision();
        draw();
      }, 150); // Snake moves every 150 milliseconds
    }
  
    function resetGame() {
      clearInterval(gameLoop);
      isGameOver = true;
      startGame();
    }
  
    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetGame);
  
    document.addEventListener("keydown", (event) => {
      if (isGameOver) return;
  
      switch (event.key) {
        case "ArrowUp":
          if (dy !== 1) {
            dx = 0;
            dy = -1;
          }
          break;
        case "ArrowDown":
          if (dy !== -1) {
            dx = 0;
            dy = 1;
          }
          break;
        case "ArrowLeft":
          if (dx !== 1) {
            dx = -1;
            dy = 0;
          }
          break;
        case "ArrowRight":
          if (dx !== -1) {
            dx = 1;
            dy = 0;
          }
          break;
      }
    });
  });
  