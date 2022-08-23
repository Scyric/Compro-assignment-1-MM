//Creates variables without having to type var= each time
let eye,
  sun,
  rose1,
  rose2,
  rose3,
  grassrare,
  grass1,
  grass2,
  pat1,
  pat2,
  pat3,
  pat4,
  pat5,
  pat6,
  pat7,
  fruit1,
  fruit2,
  fruit3,
  ccleft,
  ccright,
  slider1;

//preloading images for future usage

function preload() {
  sun = loadImage("ref/New sun.png");
  tree = loadImage("ref/treetransparent2.png");
  rose1 = loadImage("ref/rose1.png");
  rose2 = loadImage("ref/rose2.png");
  rose3 = loadImage("ref/rose3.png");
  grass1 = loadImage("ref/grass.png");
  grass2 = loadImage("ref/grass2.png");
  pat1 = loadImage("ref/pat1.png");
  pat2 = loadImage("ref/pat2.png");
  pat3 = loadImage("ref/pat3.png");
  pat4 = loadImage("ref/pat4.png");
  pat5 = loadImage("ref/pat5.png");
  pat6 = loadImage("ref/pat6.png");
  pat7 = loadImage("ref/pat7.png");
  fruit1 = loadImage("ref/fruit1.png");
  fruit2 = loadImage("ref/fruit2.png");
  fruit3 = loadImage("ref/fruit3.png");
  ccleft = loadImage("ref/curtainleft.png");
  ccright = loadImage("ref/curtainright.png");

  //from p5play allows me to make an animated gif easily
  
  eye = loadAni(
    "ref/eye1.png",
    "ref/eye1.png",
    "ref/eye2.png",
    "ref/eye2.png",
    "ref/eye3.png",
    "ref/eye2.png",
    "ref/eye2.png",
    "ref/eye4.png",
    "ref/eye4.png",
    "ref/eye5.png",
    "ref/eye4.png",
    "ref/eye4.png",
    "ref/eye2.png",
    "ref/eye3.png",
    "ref/eye2.png"
  );
}

//variables

var mode;
var size = 1000;
var randomeyeX;
var randomeyeY;
var ccdown = -20;
var ccl = -30;
var ccr = 100;
var ang = 0;
var randompattern;
var ranfauna;
var ran = 0;
var ranpat;
var ransize;
var ransize2;
var ranfruit;

function setup() {
  mode = 0;
  background(20);
  createCanvas(1000, 800);
  textSize(40);
  
  
  //creating graphics whenever they are needed for scenes
  
  Stars = createGraphics(800, 600);
  Stars.clear();
  sewnsky = createGraphics(800, 800);
  sewnsky.clear();

  flowerbed = createGraphics(800, 800);
  flowerbed.clear();
  flowerbed.imageMode(CENTER);
  instructions = createGraphics(1000, 800);
  instructions.clear();
  fruit = createGraphics(800, 600);
  fruit.clear();

  // aslider to adjust darkness in the final
  
  slider = createSlider(0, 100, 0, 2);
  slider.position(800, 800);
  slider.style("width", "80px");

  angleMode(DEGREES);
  //flowerbed.frameDelay = 1000;
}

function draw() {
  clear();
  
  //mode is used as a change of states
  
  if (mode == 0) {
    background(220);
    
    //writing text
    text("To begin press Y", 50, 300);
    text("Replenish the stars that gleam in the sky", 50, 400);
    text("But among all else avoid the eye", 50, 500);
  
    //small function to create a cursor if mouse is pressed
    if (mouseIsPressed == true) {
      translate(mouseX, mouseY);
      image(rose1, 0, 0, 50, 50);
    }
  }
  if (mode == 1) {
    
    //used to create gradients made by kazuki umeda https://www.youtube.com/watch?v=-MUOweQ6wac
    let gradient = drawingContext.createLinearGradient(0, 0, 800, height);
    gradient.addColorStop(0, color(4, 71, 124));
    gradient.addColorStop(1, color(210, 100, 100));

    drawingContext.fillStyle = gradient;
    rect(0, 0, 800, height);
//custom function
    fadingSun();

    let gradient2 = drawingContext.createLinearGradient(0, 600, 800, 200);
    gradient2.addColorStop(0, color(50, 100, 124));
    gradient2.addColorStop(1, color(110, 100, 100));

    drawingContext.fillStyle = gradient2;
    noStroke();
    // fill(50,100,80 )
    rect(0, 600, 800, 200);

    drawStars();
//one of the createGraphics(); windows
    image(Stars, 0, 0);
  }
  // a new change of state
  if (mode == 2) {
    fill(50);
    rect(0, 0, 800, 800);
    //making curtains for interesting visuals
    
    image(ccleft, -200, 0, 550, 1000);
    image(ccright, ccr, 0, 1000, 1000);

    fill(255);
// a hint for the player to press ENTER
    text("it would be best not to ENTER", 50, 400);
    
    //if enter is pressed the mode will be change to 3
    if (keyIsPressed && keyCode === ENTER) {
      mode = 3;
    }
  }

  if (mode == 3) {
    
    //depending on what height the mouse is it will draw based on the functions
    if (mouseY > 550) {
      strewn();
    } else if (mouse < 550);
    {
      sewn();
      yum();
    }
    background(20);
    //rect(0,0,800,800);
    //drawSewn();
    
    // a set of images overlayed with each other
    image(Stars, 0, 0);
    image(instructions, 0, 0);

    image(sewnsky, 0, 0);

    {// to make a image rotate in an irregular manner
      push();
      z = random(0.1, 3);
      ang = ang + z;

      translate(700, 550);
      rotate(ang);
      imageMode(CENTER);
      image(sun, 0, 0, 300, 300);
      pop();
    }
    //the sprite made form using p5 play and photoshop
    animation(eye, 700, 550);
    image(tree, 0, 0, 800, 800);
    image(fruit, 0, 0);
//code that failed for some reason
    // { if (ccl>-400);{
    //  ccl=ccl-1;
    // }
    {// animating the curtain to move
      if (ccr < 830) {
        ccr += 5;
      }
    }
//the curtain will move up to a certain length from above ccr
    image(ccleft, -470, 0, 550, 1000);
    image(ccright, ccr, 0, 1000, 1000);

    {
      //drawn on the instructions, it constantly creates message to add to the horror theme
      instructions.rotate(90);
      instructions.fill(250);
      instructions.text("left click for the atmosphere", 800, 200);
      instructions.text("What have you done?", 900, 300);
      instructions.text("right click for monstrosities", 700, 400);
      instructions.text("n for the night", 600, 500);
    }
    
    //did not know how to animate each 'flower' seperately so I animated the whole lot
    image(flowerbed, 0, ran);
    if (ran < 45);
    {// the very low number enables a very smooth and non eye threatening result
      ran += 0.5;
    }
    if (ran > 6) {
      ran = 0 - 10;
    }
    //creating a slider based on transparency
    let val = slider.value();
//the rectangle is overlayed at the very end in mode=3
    fill(0, 0, 0, val);
    rect(0, 0, 1000, 800);
  }
}
// very simply function to begin which changes the state
function keyPressed() {
  if (key == "y") {
    mode = 1;
  }
}
// basic drawing function
function drawStars() {
  if (mouseIsPressed) {
    Stars.fill(255, 150, 70, 100);
    Stars.noStroke();
    Stars.ellipse(mouseX, mouseY, 5, 3);
  }
}
//a nire advabced drawubg function which draws on the flowerbed createGraphics(); and to decrease the amount of flowers the values are kept relatively low with there even being a lucky event.
//the image is drawn at the location of the x,y of the mouse and then spawns a random flower
function strewn() {
  if (mouseIsPressed == true) {
    flowerbed.push();

    flowerbed.translate(mouseX, mouseY);

    //   flowerbed.rotate(5);

    ranfauna = random(0, 100);
    if (ranfauna < 5) {
      flowerbed.image(rose1, 0, 0, 50, 50);
    } else if (ranfauna > 5 && ranfauna < 7.5) {
      flowerbed.image(rose2, 0, 0, 50, 50);
    } else if (ranfauna > 7.5 && ranfauna < 10) {
      flowerbed.image(rose3, 0, 0, 50, 50);
    } else if (ranfauna > 10 && ranfauna < 20) {
      flowerbed.image(grass1, 0, 0, 50, 50);
    } else if (ranfauna > 20 && ranfauna < 20.1) {
      flowerbed.image(grass2, 0, 0, 100, 100);
    }
    flowerbed.pop();
  }
}
// same concept as before except it rotates it and changes the size of the patterns to add to the chaos
function sewn() {
  if (mouseIsPressed == true && mouseButton == LEFT) {
    sewnsky.push();

    sewnsky.translate(mouseX, mouseY);

    sewnsky.rotate(random(0, 360));
    ransize = random(75, 100);

    ranpat = random(0, 100);
    if (ranpat < 8) {
      sewnsky.image(pat1, 0, 0, ransize, ransize);
    } else if (ranpat > 9 && ranpat < 16) {
      sewnsky.image(pat2, 0, 0, ransize, ransize);
    } else if (ranpat > 17 && ranpat < 23) {
      sewnsky.image(pat3, 0, 0, ransize, ransize);
    } else if (ranpat > 24 && ranpat < 33) {
      sewnsky.image(pat4, 0, 0, ransize, ransize);
    } else if (ranpat > 34 && ranpat < 41) {
      sewnsky.image(pat5, 0, 0, ransize, ransize);
    } else if (ranpat > 42 && ranpat < 49) {
      sewnsky.image(pat6, 0, 0, ransize, ransize);
    } else if (ranpat > 50 && ranpat < 56) {
      sewnsky.image(pat7, 0, 0, ransize, ransize);
    }

    sewnsky.pop();
  }
}
// concept is the same as before though i did attempt to draw a sprite instead though that did not work
function yum() {
  if (mouseIsPressed == true && mouseButton == RIGHT) {
    fruit.push();

    fruit.translate(mouseX, mouseY);
    ransize2 = random(40, 80);
    //attempt to draw sprites
    // fruit.animation(eye,0,0)

    ranfruit = random(0, 100);
    if (ranfruit < 6) {
      fruit.image(fruit1, 0, 0, ransize2, ransize2);
    } else if (ranfruit > 12 && ranfruit < 18) {
      fruit.image(fruit2, 0, 0, ransize2, ransize2);
    } else if (ranfruit > 24 && ranfruit < 29) {
      fruit.image(fruit3, 0, 0, ransize2, ransize2);
    }

    fruit.pop();
  }
}

// testing a basic animation loop to try and emulate an eye ball
function fadingSun() {
  let gradient3 = drawingContext.createLinearGradient(0, 0, 800, height);
  gradient3.addColorStop(0, color(240));
  gradient3.addColorStop(1, color(210, 100, 100));
  drawingContext.fillStyle = gradient3;

  // the original size of the sun which constantly decreases as long as its bigger than 600 however when it reaches less than 600 the value is reset to 600.5 and thena ellipse is drawn within some parameters set
  ellipse(780, 800, size, size);
  if (size > 600) {
    size -= 0.25;
  } else {
    size = 600.05;

    let gradient4 = drawingContext.createLinearGradient(0, 0, 800, height);
    gradient4.addColorStop(0, color(20));
    gradient4.addColorStop(1, color(0));
    drawingContext.fillStyle = gradient4;
    //parameters that are set which are roughly within the ellipse
    randomeyeX = random(600, 800);
    randomeyeY = random(500, 600);
    ellipse(randomeyeX, randomeyeY, 50, 50);
// once the sun has set mode 2 can be unlocked by clicking on the circle even by accident
    if (dist(mouseX, mouseY, 780, 800) < 300) {
      if (mouseIsPressed) {
        mode = 2;
      }

      //if mouseisPressed()

      //  if (mouseisPressed() && mouseX>500 && mouseY>500);{

      //    mode=2}
    }
  }
}
