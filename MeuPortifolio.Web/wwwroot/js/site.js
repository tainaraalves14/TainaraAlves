const canvas = document.getElementById('memoryCanvas');
const ctx = canvas.getContext('2d');

// Ajuste do tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];
const maxPoints = 100; // Quantidade de pontos
const maxDistance = 150; // Distância máxima para conexão

// Criando os pontos de "memória"
class Point {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.2; // Velocidade em X
        this.vy = (Math.random() - 0.5) * 1.2; // Velocidade em Y
        this.opacity = Math.random() * 0.3 + 0.2; // Opacidade entre 0.2 e 0.5
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        // Reflete nas bordas
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Inicializando os pontos
function init() {
    for (let i = 0; i < maxPoints; i++) {
        points.push(new Point());
    }
}

// Desenhar conexões entre pontos próximos
function drawConnections() {
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let dx = points[i].x - points[j].x;
            let dy = points[i].y - points[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                let opacity = 1 - distance / maxDistance;
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Atualiza e renderiza os pontos
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach(point => {
        point.move();
        point.draw();
    });

    drawConnections();

    requestAnimationFrame(animate);
}

// Ajusta o canvas ao redimensionar a janela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();
