/* eslint no-undef: 0 */

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

//while ()

function setup() {
  createCanvas(GAME_WIDTH, GAME_HEIGHT);
  windowResized();
}

function startCalculation() {
  funcString = document.getElementById('equation').value;
  acceptableError = math.evaluate(document.getElementById('error').value);
  xn = document.getElementById('initialValue').value;
  n = 1;
  error = 1000;
}

function fValue(xn) {
  return math.evaluate(funcString, {x: xn});
}

function fDerivative(xn) { 
  //Using definition of a derivative rather than built in derivative function
  return (math.evaluate(funcString, {x: xn+h})-math.evaluate(funcString, {x: xn}))/h;
}          

function draw() {
  for (let i = 0; i<calcsPerFrame; i++) {
    if (n<maxIterations && error > acceptableError && funcString !== "" || n < 5) {
      //set error to previous value
      error = xn;
      xn = xn - (fValue(xn)/fDerivative(xn));
      //take away new value
      error -= xn;
      error = Math.abs(error);
      n++;
    }
  }
  background(50);
  textSize(50);
  fill(255, 255, 255);
  if (n > 1) {
    text(`Zero value: x ≈ ${xn.toFixed(5)}`, 50, 50);
    text(`Difference: ±${error.toFixed(5)}`, 50, 100);
    text(`Iterations: ${n}`, 50, 150)
  } else {
    text(`Zero value: x ≈ `, 50, 50);
    text(`Difference: ±`, 50, 100);
    text(`Iterations: `, 50, 150)
  }


  scale(width/GAME_WIDTH);
}

//window resize handling
function windowResized() {
  let newWidth = windowWidth;
  let newHeight = windowHeight;
  let newRatio = newWidth / newHeight;

  if (newRatio >= canvasRatio) {
    //Width is bigger than wanted
    newWidth = newHeight * canvasRatio;
    resizeCanvas(newWidth, newHeight);
  } else if (newRatio < canvasRatio) {
    //Height is bigger than wanted
    newHeight = newWidth / canvasRatio;
    resizeCanvas(newWidth, newHeight);
  }
}