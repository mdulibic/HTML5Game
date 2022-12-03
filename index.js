const components = [];

function startGame() {
    for (let i = 0; i < generateRandom(); i++) {
        components.push(new component(30, 30, generateColor(), generateRandomWithMax(480), generateRandomWithMax(270)));
    }
    myGameArea.start();
}

function generateColor(min = 1, max = 6) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    switch(rand) {
        case 1:
            return "red";
            break;
        case 2:
            return "blue";
            break;
        case 3:
            return "green";
        case 4:
            return "yellow";
        case 5:
            return "pink";
            break;
        default:
            return "black";
    }
}

function generateRandom(min = 2, max = 20) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}

function generateRandomWithMax(maxLimit ){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand);
    return rand;
}

var myGameArea = {
    canvas: document.createElement("canvas"), start: function () {
        this.canvas.id = "myGameCanvas";
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    stop: function () {
        clearInterval(this.interval);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function checkIfTouched(x, y) {

}

myGameArea.canvas.addEventListener('click', (event) => {
    components.forEach((c) => {
        if (c.contains(event.clientX, event.clientY)) {
            hitNumber++;
            components.splice(components.indexOf(c), 1);
            updateGameArea();
        }
    })
    if(components.length === 0) {
        alert("Win, good job!");
        startGame();
        hitNumber = 0;
    }
})

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed_x = Math.floor(Math.random() * (5 - 0.5)) + 0.5;
    this.speed_y = Math.floor(Math.random() * (5 - 0.5)) + 0.5;
    this.x = x;
    this.y = y;

    this.contains = function (x, y) {
        return this.x <= x && x <= this.x + this.width &&
            this.y <= y && y <= this.y + this.height;
    }

    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }

    this.newPos = function() {
        if (this.x - this.width / 2 < 0) this.speed_x = 2;
        else if ((this.x + this.width / 2) >= myGameArea.context.canvas.width) this.speed_x = -2;
        if (this.y - this.height / 2 < 0) this.speed_y = -2;
        else if ((this.y + this.height / 2) >= myGameArea.context.canvas.height) this.speed_y = 2;

    this.x += this.speed_x;
    this.y -= this.speed_y;
    }
}

var hitNumber = 0;

function updateGameArea() {
    myGameArea.clear();
    myGameArea.context.font = "16px Arial";
    myGameArea.context.fillText(" Broj generiranih komponenti: "+components.length, 250, 20);
    myGameArea.context.fillText(" Broj pogodenih komponenti: "+hitNumber, 250, 40);
    components.forEach((c) => {
        c.newPos();
        c.update()
    });
}