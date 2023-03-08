let table; //creates table variable for data file
let points = []; // creates an array for the circles
var t; //var t for noise movement/speed 
let selectedCountry = null; //variable for which country has been clicked on (set to null until clicked on)
let startText = true; // variable to check if start text needs to be displayed


// loads the CSV file before setup function
function preload() {
  table = loadTable("happinessDataset.csv", "csv", "header"); //setting table variable to this dataset file
}

//setup function loads before the draw function
function setup() {
  t = 0; //var t set to 0 for movement
  createCanvas(1300, 800); //creates the canvas
}

//draw function loops
function draw() {
  background(0); //background set to black

  fill(15); //fills the ellipse 
  ellipse(width/2, height/2, 800); //background ellipse (supposed to be the world)

  fill(255); //fills the text
  textSize(12); //text size set to 12
  textAlign(CENTER); //centers the text
  text("2022 HAPPINESS INDEX", width / 2, 80); //title text 

  //calling data from the .csv file 
  for (var r = 0; r < table.getRowCount(); r++) { // cycles through each row of the table
    
    points[r] = new DataPoint( //assigning the DataPoint class to each object of the points array
      table.getString(r, 1), //column for countries from dataset
      table.getString(r, 11), //column for rank 2022 from dataset
      table.getString(r, 12) //column for score 2022 from dataset
    );

    points[r].drawBasic(); //calls drawBasic function for each point
  }

  //creating the legend at the bottom
  rectMode(CENTER); //centers rectangle shape 
  var legendX = width / 2; //rect X pos
  var legendY = 750; //rect Y pos
  var legendW = 220; //rect width
  var legendH = 16; //rect height
  
  var c1 = color(0, 50, 255); //colour 1 to be used in lerp
  var c2 = color(255, 190, 0); //colour 2 to be used in lerp
  noStroke(); //deletes stroke
  
  
  for (var i = 0; i <= legendW; i++) {  // cycles through the width of the legend (rect)
    fill(lerpColor(c1, c2, i / legendW)); //fill with assigned colours
    rect(legendX - legendW / 2 + i, legendY, 1, legendH); //creates the rectangle 
  }
  
  
  textAlign(LEFT); //aligns text to the left 
  textSize(10); //text size set to 10 
  fill(255); //fill colour  
  text("HIGH", legendX + 80, legendY +3); //text indicating the "high" colour
  textAlign(RIGHT); //aligns text to the right
  text("LOW", legendX - 80, legendY +3);  //text indicating the "low" colour
  
  // if a circle has been clicked, displays the selected country's information
  if (selectedCountry !== null) { //if variable "selectedCountru" does not equal null (when mouse clicked)
    fill(255); //fill colour 
    textSize(20); //text size set to 20 
    textAlign(CENTER); //aligns text to the center

    text(selectedCountry.country, width / 2, 690);  //text indicating the selected country when mouse clicked
    textSize(12); //text size set to 12 
    text("RANK " + selectedCountry.rank, width / 2, 710);  //text indicating the selected country's rank
    text("SCORE " + selectedCountry.score, width / 2, 730);  //text indicating the selected country's score
  }

  t += 0.01 / 6; //increasing value of t for noise movement
  
  // displays the start text if no circle has been clicked yet
  if (startText) {
    fill(255); //fill colour 
    textSize(12); //text size set to 12 
    textAlign(CENTER); //aligns text to the center
    text("CLICK ON A CIRCLE!", width / 2, 720); //text for prompting user to click on the circles
  }
}

//mouseClicked runs when mouse is clicked
function mouseClicked() { 
  
  for (var i = 0; i < points.length; i++) { //cycles through each point (circle)
    var d = dist(mouseX, mouseY, points[i].x, points[i].y); //sets d variable to check if mouse position is the same as point position
    if (d < points[i].score * 7.5) { //checks if mouse clicks on a specific circle
      console.log("country: " + points[i].country); //console logs the country clicked on  
      selectedCountry = points[i]; //selectedCountry variable is set to that specific country from the points array
    }
  }
  startText = false; //startText set to false so it gets removed from the canvas when mouse is clicked
  
}

//class for each circle/country
class DataPoint {
  constructor(country, rank, score) { 
    this.country = country; //assigns this.country to country parameter
    this.rank = rank; //assigns this.rank to rank parameter
    this.score = score;  //assigns this.score to score parameter
    this.x; //creates X position for objects
    this.y; //creates Y position for objects
  }

  drawBasic() {
    //pulsing effect
    let pulseScale = 1 + sin(frameCount * 0.05 + this.rank * 10) * 0.1;
    let circleSize = int(this.score) * 13 * pulseScale; 

    //noise movement
    this.x = map(noise(t, this.rank), 0, 1, 20, width); //sets X position to mapped(smoother) noise movement / calling t variable 
    this.y = map(noise(t + 10, this.rank * 0.6), 0, 1, 10, height); //sets Y position to mapped(smoother) noise movement / calling t variable + 10

    // gradient
    let c1, c2; //creates two colour variables
    if (this.score < 5) { //if the score is less than 5, start with this set of colours
      c1 = color(0, 50, 255, 240) //sets first colour in the gradient 
      c2 = color(255, 190, 0, 240); //sets second colour in the gradient 
    } else {
      c1 = color(0, 50, 255, 240) //sets first colour in the gradient 
      c2 = color(255, 190, 0, 240);  //sets second colour in the gradient 
    }
    
    let fillColor = lerpColor(c1, c2, map(this.score, 4, 7, 0, 1)); //lerp colour creates a gradient effect from one colour to another
    fill(fillColor); //fill colour 

    //ellipse and text
    stroke(255); //white stroke

    //checks if the score is higher than 0 (removes the countries that don't have a score)
    if (this.score > 0) { 
      ellipse(this.x, this.y, circleSize); //creates ellipse 
      noStroke(); //removes stroke
      fill(255); //fill colour
      textSize(10); //text size set to 10 
      textAlign(CENTER); //center aligns the text bellow
      text(this.country, this.x, this.y); //text that displays the country for each circle at the same position 
    }
  }
}
