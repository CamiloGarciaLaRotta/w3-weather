var particles = [];


function setup() {
    createCanvas($('.js-background').width()-10, $('.js-background').height()-10);
    frameRate(30)
    // initialize particles
    for (var i=0;i<5;i++) {
        particles[i] = new Particle()
    }
}
 
function draw() {
    background(255); 
    for (var i=0;i<particles.length;i++) {
        particles[i].update()
        particles[i].display()
    }
}

function Particle(){
    // position and velocity
    this.pos = new p5.Vector(getRandom(-20), getRandom(-20))
    this.v = new p5.Vector(10, 10)
    
    this.update = function() {
        this.pos.add(this.v)
        if ((this.pos.x > width) || (this.pos.y > height)) this.pos.set(getRandom(-20),getRandom(-20));
    }

    this.display = function() {
        stroke(0)
        fill(50)
        ellipse(this.pos.x, this.pos.y, 20, 20)
    }
}

function getRandom(range) {
    return Math.floor(Math.random()*range)
}