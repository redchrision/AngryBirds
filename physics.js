////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here Step 1
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here Step 2
  fill(255);
  drawVertices(propeller.vertices);   
  Body.setAngle(propeller, angle);  
  Body.setAngularVelocity(propeller, angleSpeed);    
  angle = angle + angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here Step 3
  for(var i=0; i < birds.length; i++){
    fill(255, 0, 0);
    drawVertices(birds[i].vertices);

    if (isOffScreen(birds[i])){
        World.remove(engine.world, birds[i]);
        birds.splice(i, 1);
        i--;
    }
}
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here Step 4
  for(var i=0; i < 3; i++){
    for(var j=0; j < 6; j++){
      var box = Bodies.rectangle(700 + i*80, 540 - j*80, 80, 80);
      boxes.push(box);

      //Bibliography for the code: // https://stackoverflow.com/questions/26552829/generate-random-shades-of-green
      var c = color(0, (Math.random() * 125) + 100, 0);
      colors.push(c);

      World.add(engine.world, box);
    }
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here Step 5
  for(var i=0; i < boxes.length; i++){
    fill(colors[i]);
    drawVertices(boxes[i].vertices);

    if (isOffScreen(boxes[i])){
      World.remove(engine.world, boxes[i]);
      boxes.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here Step 6
  slingshotBird = Bodies.circle(200, 180, 20, {friction: .95, restitution: .95});
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  
  slingshotConstraint = Constraint.create({
    pointA: {x: 200, y: 160},
    bodyB: slingshotBird,
    pointB: {x: -10, y: -1},
    stiffness: 0.01,
    damping: 0.0001
  })

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here Step 7
  fill(255,165,0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

// Step 8
// Function that turned the program into a game. 
// It creates a countdown. 
// The player has a 60 seconds to remove all boxes from the screen. 
// If they succeed, they win. 
// If they fail, looping stops and a GAME OVER message is displayed.
// Bibliography for the code: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp- 

function drawCountdown(){
  // draw the counter 
  textSize(50);
  textAlign(CENTER);
  fill(255);
  text(timer, width/2, height/2);

  // frameCount tracks the number of times the iteration from the if statement happend 
  // timer will countdown a second in each iteration, start at its initial value 60 and stop at 0
  if (frameCount % 60 == 0 && timer > 0) {
   timer --;
  };

  // if the boxes from the screen are equal to 0, the text is displayed, both if the timer reached 0 or the timer is greater than 0
  if ((timer >=0 && boxes.length == 0)){
    text("Congratulations! You won!", width/2, height*0.7);
  }

  // if the timer reached 0 and at least one box remained on the screen, then the text is displayed
  if (timer == 0 && boxes.length > 0) {
    text("Game Over", width/2, height*0.7);
   };
}