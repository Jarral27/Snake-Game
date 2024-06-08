// Select the canvas element and get its context for drawing
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the grid size and the number of grids in the canvas
const gridSize = 20;
const canvasSize = 400;
const canvasGridCount = canvasSize / gridSize;

// Initialize the snake as an array of segments, starting with one segment
let snake = [{x: 10, y: 10}];

// Initialize the direction the snake is moving (initially moving to the right)
let direction = {x: 1, y: 0}; // Initially set the direction to move right

// Place the first food item at a random position on the grid
let food = {x: Math.floor(Math.random() * canvasGridCount), y: Math.floor(Math.random() * canvasGridCount)};

// Initialize the score
let score = 0;

// Main game loop that updates the game state and renders the game
function gameLoop() {
    update();  // Update the game state
    draw();    // Render the game
    setTimeout(gameLoop, 100);  // Repeat the loop every 100 milliseconds
}

// Update the game state, including moving the snake and handling collisions
function update() {
    // Calculate the new head position based on the current direction
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // Check if the snake collides with the walls or itself
    if (head.x < 0 || head.y < 0 || head.x >= canvasGridCount || head.y >= canvasGridCount || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over!');  // Display game over message
        resetGame();  // Reset the game
        return;
    }

    // Add the new head position to the snake
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;  // Increase the score
        // Place new food at a random position
        food = {x: Math.floor(Math.random() * canvasGridCount), y: Math.floor(Math.random() * canvasGridCount)};
    } else {
        // Remove the last segment of the snake to maintain its length
        snake.pop();
    }
}

// Draw the game elements (snake and food) on the canvas
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw the food as a red square
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw the snake as green squares
    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));
}

// Reset the game to the initial state
function resetGame() {
    snake = [{x: 10, y: 10}];  // Reset the snake
    direction = {x: 1, y: 0};  // Reset the direction to move right
    score = 0;  // Reset the score
    // Place new food at a random position
    food = {x: Math.floor(Math.random() * canvasGridCount), y: Math.floor(Math.random() * canvasGridCount)};
}

// Event listener for keyboard input to change the snake's direction
window.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};  // Move up
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};  // Move down
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};  // Move left
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};  // Move right
            break;
    }
});

// Start the game loop
gameLoop();

