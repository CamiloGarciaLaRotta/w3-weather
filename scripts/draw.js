// DOM
let windowWidth = $('.js-background').width();
let windowHeight = $('.js-background').height();
let bodyMargin = 4;

// Velocity
let vFactor = 4;

// Particles
let numOfParticles = 200;
let particleRadius = 10;
let particles = new Array(numOfParticles);


//// Graphical functions
function setup() {
    createCanvas(windowWidth - bodyMargin, windowHeight - bodyMargin);
    frameRate(30);
    for (let i = 0; i < particles.length; i++) {
        particles[i] = new Particle();
    }
}

function draw() {
    // only draw once a velocity from an input city has been given
    if (particles[0].v.x !== 0) {
        background('#f3f3f3');
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].display();
        }
    }
}

function Particle() {
    // position and velocity
    this.pos = new p5.Vector(getRandom(-windowWidth, windowWidth), getRandom(-windowHeight, windowWidth));
    this.v = new p5.Vector(0, 0);
    this.D;
    this.T;

    this.update = () => {
        this.pos.sub(this.v);
        if ((this.pos.x > windowWidth + 10) || (this.pos.y > windowHeight + 10) ||
            (this.pos.x < -10) || (this.pos.y < -10)) {
            this.pos.set(getRandom(-windowWidth, windowWidth), getRandom(-windowHeight, windowHeight));
        }
    };

    this.display = () => {
        let color = '';
        if (this.T <= -15) color = 'rgb(105, 73, 255)';
        else if (this.T <= -5) color = 'rgb(73, 121, 255)';
        else if (this.T <= 5) color = 'rgb(22, 176, 221)';
        else if (this.T <= 12) color = 'rgb(255, 213, 7)';
        else if (this.T <= 25) color = 'rgb(255, 178, 0)';
        else color = 'rgb(242, 114, 66)';
        noStroke();
        fill(color);
        ellipse(this.pos.x, this.pos.y, particleRadius, particleRadius);
    };
}

//// Helper Methods
let setParticleParams = (x, y, D, T) => {
    for (let i = 0; i < particles.length; i++) {
        particles[i].v.set(x, y);
        particles[i].D = D;
        particles[i].T = T;
    }
}

let getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let toRads = deg => deg * (Math.PI / 180);
