//// Globals

// DOM
var windowWidth = $('.js-background').width()
var windowHeight = $('.js-background').height()
var bodyMargin = 4

// Velocity
var vFactor = 4;

// Particles
var numOfParticles = 200;
var particleRadius = 20;
var particles = new Array(numOfParticles)


//// Graphical functions

function setup() {
    createCanvas(windowWidth-bodyMargin, windowHeight-bodyMargin);
    frameRate(30)
    for (var i=0;i<particles.length;i++) {
        particles[i] = new Particle()
    }
}
 
function draw() {
    // only draw once a velocity from an input city has been given
    if (particles[0].v.x !== 0) {
        background(255);
        for (var i=0;i<particles.length;i++) {
            particles[i].update()
            particles[i].display()
        }
    }
}

function Particle(){
    // position and velocity
    this.pos = new p5.Vector(getRandom(-windowWidth, windowWidth), getRandom(-windowHeight, windowWidth))
    this.v = new p5.Vector(0, 0)
    
    this.update = function() {
        this.pos.sub(this.v)
        if ((this.pos.x > width) || (this.pos.y > height)) this.pos.set(getRandom(-windowWidth, windowWidth), getRandom(-windowHeight, windowWidth));
    }

    this.display = function() {
        stroke(0)
        fill(50)
        ellipse(this.pos.x, this.pos.y, particleRadius, particleRadius)
    }
}

//// Helper Methods

function setVelocity(x, y) {
    for (var i=0;i<particles.length;i++) {
        particles[i].v.set(x, y)
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}