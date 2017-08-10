var canvas = document.getElementById('canvas');

window.onload = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');

    var ball;
    var balls = [];

    init();

    setInterval(function() {
        update();
        draw();
    }, 1000 / 30);

    function init() {
        for (var i = 0; i < 1000; i++) {
            balls.push(buildBall());
        }
        ball = buildBall();
    }

    function buildBall() {
        var ball =  {
            lifespan: getRandomInt(0, 1000),
            colorCode: getRandomInt(0, 255),
            radius: getRandomInt(1, 4),
            dx: getRandomInt(-3, 3),
            dy: getRandomInt(1, 3)
        };

        ball.x = getRandomInt(0 + (ball.radius / 2), canvas.width - (ball.radius / 2));
        ball.y = getRandomInt(0 + (ball.radius / 2), canvas.height - (ball.radius / 2));
        ball.fillStyle = generateColor(ball.colorCode);

        return ball;
    }

    function generateColor(colorCode) {
        return 'rgb(' + colorCode + ',' + colorCode + ',' + colorCode + ')';
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    function update() {
        balls = balls.map(function(ball) {
            if (ball.colorCode === 0) {
                return buildBall();
            } else {
                return ball;
            }
        });

        balls.forEach(function(ball) {
            updateBall(ball);
        });
    }

    function updateBall(ball) {
        ball.colorCode--;
        ball.fillStyle = generateColor(ball.colorCode);

        if (ball.x + (ball.radius / 2) > canvas.width) {
            ball.dx = -ball.dx;
        }
        if (ball.x - (ball.radius / 2) < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + (ball.radius / 2) > canvas.height) {
            ball.dx = -(ball.dx * 0.3);
            ball.dy = -(ball.dy * 0.3);
        }
        if ((ball.y + (ball.radius / 2) < canvas.height) && (ball.dy < 1)) {
            ball.dx = getRandomInt(-3, 3);
            ball.dy = getRandomInt(1, 3);
        }
        if (ball.y - (ball.radius / 2) < 0) {
            ball.dy = -ball.dy;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
    }

    function draw() {
        clear();
        balls.forEach(function(ball) {
            drawBall(ball);
        });
        ctx.font = '48px "Indie Flower"';
        ctx.fillStyle = 'white';
        ctx.textAlign='center'; 
        ctx.fillText('Hello snowy world', canvas.width / 2, canvas.height / 2);
    }

    function clear() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawBall(ball) {
        var ballPosX = ball.x - (ball.radius / 2);
        var ballPosY = ball.y - (ball.radius / 2);

        ctx.beginPath();
        ctx.arc(ballPosX, ballPosY, ball.radius, 0, 2 * Math.PI, false);

        ctx.restore();

        ctx.fillStyle = ball.fillStyle;
        ctx.fill();
    }
};

window.onresize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
