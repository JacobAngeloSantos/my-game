// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let ball = { x: 50, y: 50, radius: 10, dx: 2, dy: 2 };
let score = 0;
let isGameOver = false;

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

// Update ball position
function updateBall() {
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;

  ball.x += ball.dx;
  ball.y += ball.dy;
}

// Handle mouse click
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const distance = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
  if (distance < ball.radius) {
    score++;
    ball.dx *= 1.1; // Increase speed
    ball.dy *= 1.1;
  }
});

// Draw the score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Main game loop
function gameLoop() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawScore();
  updateBall();

  requestAnimationFrame(gameLoop);
}

gameLoop();
