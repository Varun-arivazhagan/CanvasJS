const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');

let circles = [];
let isDrawing = false;
let startX, startY;

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const currentX = e.offsetX;
        const currentY = e.offsetY;
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));

        // Clear the canvas and redraw all circles
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircles();

        // Draw the current circle
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (isDrawing) {
        isDrawing = false;
        const currentX = e.offsetX;
        const currentY = e.offsetY;
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));

        circles.push({ x: startX, y: startY, radius: radius });
    }
});

canvas.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const clickY = e.offsetY;

    const hit = circles.some(circle => isInsideCircle(circle, clickX, clickY));
    message.textContent = hit ? 'Hit' : 'Miss';
});

canvas.addEventListener('dblclick', (e) => {
    const clickX = e.offsetX;
    const clickY = e.offsetY;

    for (let i = 0; i < circles.length; i++) {
        if (isInsideCircle(circles[i], clickX, clickY)) {
            circles.splice(i, 1); // Remove the circle
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCircles();
            break;
        }
    }
});

resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles = [];
    message.textContent = '';
});

function drawCircles() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        ctx.fillStyle = getRandomColor();
        ctx.fill();
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isInsideCircle(circle, x, y) {
    const distance = Math.sqrt(Math.pow(x - circle.x, 2) + Math.pow(y - circle.y, 2));
    return distance <= circle.radius;
}
