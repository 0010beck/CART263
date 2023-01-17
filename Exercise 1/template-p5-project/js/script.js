
function setup() { //setup function runs before draw function
    
    createCanvas(400, 400); //creates canvas at these dimensions
}

var rectX = 0; //sets the x pos of rect 1 
var rectY = 150; //sets the y pos of rect 1

var rectX2 = 375; //sets the x pos of rect 2
var rectY2 = 150; //sets the y pos of rect 2 

var hit = false; //sets hit status to false
var hit2 = false; //sets hit2 status to false

let x = 200; //sets x spawn of pong ball
let y = 190; //sets y spawn of pong ball
let xspeed = 3; //sets the x speed of pong ball
let yspeed = 3; //sets the y speef of pong ball

let status = false; //sets game status to false/paused

let r = 12; //sets radius size

let t = 'pong!'; //sets t var to text
var level = '0'; //sets start level to 0 as text
var level2 = '0'; //sets start level2 to 0 as text


function draw() { //draw functions runs constantly 
    background(240,240,240); //sets background and colour

    if (hit) { //if hit status is true
        xspeed = xspeed - 1 / 10; //invert direction
    }


    if (hit2) { //if hit2 status is true
        xspeed = xspeed + 1 / 10; //invert direction
    }


    if (x > width) { //if x surpasses the width
        point1(); //run point1 function 
        textSize(15); //set text size  
        fill(0); //fill black
        text('player 1 wins', 160, 50, 100, 200); //text, pos, box
        console.log('player 1 wins') //logs text 
    }


    if (x < width / width) {  //if x surpasses the width on the other side
        point2(); //run point2 function 
        textSize(15); //set text size 
        fill(0); //fill black
        text('player 2 wins', 160, 50, 100, 200); //text, pos, box
        console.log('player 2 wins'); //logs text 
    }

        textSize(15); //set text size 
        fill(0); //fill black
        text(t, 185, 30, 70, 80); //text, pos, box
        text(level2, 50, 30, 70, 80); //text, pos, box
        text(level, 340, 30, 70, 80); //text, pos, box


        rect1(); //runs rect1 function (moving paddle)
        rect2(); //runs rect2 function (moving paddle)
        pong(); //runs pong function (starts game)


    if (status == false) { // if status is false (beginning of game)
        ellipse(x, y, r * 2, r * 2);  //draw ellipse 
    }
}

function rect1() { //function for paddle 1
    rect(rectX, rectY, 25, 75); //draw rect at initial pos

    if (keyIsPressed) { //if key is pressed is true
        if (keyCode == 87) { //if w is pressed 
            rectY -= 5; //-5 from pos y (going up)
        } if (keyCode == 83) { //if s is pressed 
            rectY += 5; //+5 to pos y (going down)
        }
    }

    hit = collideRectCircle(rectX2, rectY2, 25, 75, x, y, 80); //hit library detecting paddle 1 and ball collision
    fill(hit ? color('blue') : 0);  //fills rectange with colour
}

function point1() { //score count 1
    level2++; //plus 1 to value of level2
}  

function point2() { //score count 2
    level++; //plus 1 to value of level
}


function rect2() {  //function for paddle 2
    rect(rectX2, rectY2, 25, 75); //draw rect at initial pos

    if (keyIsPressed) { //if key is pressed is true
        if (keyCode == UP_ARROW) { //if up arrow is pressed
            rectY2 -= 5; //-5 from pos y (going up)
        } if (keyCode == DOWN_ARROW) { //if down arrow is pressed 
            rectY2 += 5; //+5 from pos y (going down)
        }
    }

    hit2 = collideRectCircle(rectX, rectY, 25, 75, x, y, 80); //hit library detecting paddle 2 and ball collision
    fill(hit2 ? color('green') : 0); //fills rectangle with colour
}


function pong() { //pong function (to bounce ball)
  
    if (status) { //if status is true
        ellipse(x, y, r * 2, r * 2); //draw ellipse at x,y pos and at r value size 
        x += xspeed; //adds value of xspeed to x 
        y += yspeed; //adds value of yspeed to y
    }


    if (y > height - r || y < r) { //if pos y of ball hits top or bottom edges
        yspeed = -yspeed; //inverts direction
    }
}


function mousePressed() { //when mouse is pressed
    status = true; //sets status to true and starts game
}

