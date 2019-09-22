/* eslint no-undef: 0 */


let sketch = function (p) {
  
  const GAME_WIDTH = 1920;
  const GAME_HEIGHT = 1080;
  const canvasRatio = GAME_WIDTH / GAME_HEIGHT;

  //SET VALUES HERE
  let xn = 1; //DEFAULT STARTING VALUE
  const h = 0.0000001; //Used for calculating derivatives
  const calcsPerFrame = 5; //Set value higher to increase execution speed
  let acceptableError = 0.0000001;
  const maxIterations = 5000;
  //END OF EDITABLE VALUES

  let funcString = "";
  let n = 0; //iteration value
  let error = 1000; //dummy value
  
  p.setup = function() {
    p.createCanvas(GAME_WIDTH, GAME_HEIGHT);
    p.background(50);
    p.windowResized();

  };
  
  p.test = function () {
    return math.evaluate(document.getElementById('error').value);
  };
  
  p.startCalculation = function() {
    funcString = document.getElementById('equation').value;
    acceptableError = math.evaluate(document.getElementById('error').value);
    xn = math.evaluate(document.getElementById('initialValue').value);
    n = 1;
    error = 1000;
  };

  p.fValue = function(xn) {
    return math.evaluate(funcString, {x: xn});
  };

   p.fDerivative = function(xn) { 
    //Using definition of a derivative rather than built in derivative function
    return (math.evaluate(funcString, {x: xn+h})-math.evaluate(funcString, {x: xn}))/h;
  }
  
  p.draw = function() {
    for (let i = 0; i<calcsPerFrame; i++) {
      if (n<maxIterations && error > acceptableError && funcString !== "") {
        //set error to previous value
        error = xn;
        xn = xn - (p.fValue(xn)/p.fDerivative(xn));
        //take away new value
        error -= xn;
        error = Math.abs(error);
        n++;
      }
    }
    p.background(50);
    p.textSize(50);
    p.fill(255, 255, 255);
    if (n > 1) {
      p.text(`Zero value: x ≈ ${xn.toFixed(5)}`, 50, 50);
      p.text(`Difference: ±${error.toFixed(5)}`, 50, 100);
      p.text(`Iterations: ${n}`, 50, 150)
    } else {
      p.text(`Zero value: x ≈ `, 50, 50);
      p.text(`Difference: ±`, 50, 100);
      p.text(`Iterations: `, 50, 150)
    }


    p.scale(p.width/GAME_WIDTH);
  }
  
  //window resize handling
  p.windowResized = function() {
    let newWidth = p.windowWidth;
    let newHeight = p.windowHeight;
    let newRatio = newWidth / newHeight;
    //p.resizeCanvas(100, 100);
    if (newRatio >= canvasRatio) {
      //Width is bigger than wanted
      newWidth = newHeight * canvasRatio;
      p.resizeCanvas(newWidth, newHeight);
    } else if (newRatio < canvasRatio) {
      //Height is bigger than wanted
      newHeight = newWidth / canvasRatio;
      p.resizeCanvas(newWidth, newHeight);
    }
  };
}

let myp5 = new p5(sketch);

function startCalculation() {
  myp5.startCalculation();
}