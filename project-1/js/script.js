let fear; //variable for rectangle
let ghost = []; //creates circles array
let fearX; //rect X position
let fearY; //rect Y position

var t; //var t for noise movement

function setup() { //setup function runs before draw function
  createCanvas(800, 800); //creates canvas at 800px 

  t = 0; //var t set to 0 
  fear = new Scared(fearX, fearY, 30, 30);  //creates a new instance of Scared class (rectangle)

  for (let i = 0; i < 80; i++) { //setup forloop for circles 
    ghost[i] = new Particle(i); //creates new Particle objects with the ghost array (circles)
  }
}

function draw() { //draw functions runs constantly 
  background(0, 20); //background set to black with 20% opacity for trail effect

  fear.run();  //calls undpate function for the rectangle
  fear.show(); //calls show function for the rectangle

  for (let i = 0; i < ghost.length; i++) { //draw forloop for display and movement
    ghost[i].display(); //calls display function for each circle
    ghost[i].walk(); //calls walk function for each circle
    ghost[i].pushed(); //calls pushed function for each circle
  }

    t = t + 0.01; //increasing value of t for noise movement
}


class Particle { //circles class 
  constructor(pSize) { //constructor function with pSize as a parameter
    this.x = random(width); //sets particle x to random 
    this.y = random(height); //sets particle y to random 
    this.directionX = random(0, 2);  //sets its direction x to random between 0 and 2 
    this.directionY = random(0, 2); //sets its direction y to random between 0 and 2 
    this.diameter = pSize; //diameter = to pSize 
    this.speed = 1; //sets particle speed to 1
    this.thresh = 100; //sets threshold to 100 
    this.size = 10; //sets initial size of particles to 10 
  }

  walk() { 
    this.x = this.x + this.speed * this.directionX; //sets particle movement for x with constructor variables
    this.y = this.y + this.speed * this.directionY; //sets particle movement for y with constructor variables

    if (this.x > width - this.diameter || this.x < this.diameter) { //checks for the canvas width edges 
      this.directionX *= -1; //switches directions
    }
    if (this.y > height - this.diameter || this.y < this.diameter) { //checks for the canvas height edges 
      this.directionY *= -1; //switches directions 
    }
  }

  pushed() { //pushed function for pushing circles 
    if (dist(this.x, this.y, fearX, fearY) <= this.thresh) { //checks if the circles are within the threshold 
      this.pushed2(); //if true, calls pushed2 function
    }
  }

  pushed2() { //pushed2 function for shaking circles
    this.x += random(-150,150); //makes the circles shake on X
    this.y += random(-150,150); //makes the circles shake on Y
  }

 
  display() { //function for displaying circles 
    this.size += 0.1; //increasing value of this.size to make them bigger overtime
    fill(250,0,0); //fill colour
    noStroke(); //no stroke
    ellipse(this.x, this.y, this.size); //draws ellipse with constructor variables
    
    if(this.size > 250){ //checks if this.size is more than 250
      background(0); //sets background to black
      this.size = 0; //resets the size of the circles
    }
    
  }
}

class Scared {  //rectangle (fear) class
  constructor(x, y, w, h) {  //rectangle parameters 
    this.x = x; //sets this class x to x 
    this.y = y; //sets this class y to y 
    this.w = w; //sets this class w to w 
    this.h = h; //sets this class h to h 
  }

  //perlin noise example from: https://genekogan.com/code/p5js-perlin-noise/ (in class slides)
  run() { //run function for rectangle movement
      this.x = width * noise(t); //sets x to a random value using noise and t as a parameter
      this.y = height * noise(t + 1); //sets y to a random value using noise and t + 1 as a parameter
  }

  show() { //function for displaying the rectangle
    fill(51, 250, 250); //fill colour
    noStroke(); //no stroke
    rect(this.x, this.y, this.w, this.h); //draws rectangle using constructor variables
    fearX = this.x; //sets the rectangle's x pos to the constructor x 
    fearY = this.y; //sets the rectangle's y pos to the constructor y
  }

}
