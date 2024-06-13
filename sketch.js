let record       = true;
let recordLength = 6*60;

let entityCount  = 20;

let x = [];
let y = [];
let size = [];
let xSpeed = [];
let ySpeed = [];
let r = [];
let g = [];
let b = [];
let flickerState = [];

function preload() {
    // Load the background image
    //backgroundImage = loadImage('images/hall.JPG');
}

function setup() {
    createCanvas(564, 709);

    for (let i = 0; i < entityCount; i++) {
        x[i] = randomGaussian(0.5 * width, 70);
        y[i] = randomGaussian(0.5 * height, 50);

        xSpeed[i] = random(-0.7, 0.7);
        ySpeed[i] = random(-0.9, -0.5);

        size[i] = randomGaussian(15, 5);
        r[i] = random(140, 155);
        g[i] = random(150, 180);
        b[i] = random(0, 40);
        flickerState[i] = 0; // Initialize flicker state
    }
}

function draw() {
    background(0, 50);
    //image(backgroundImage, 0, 0, width, height
    if (record && frameCount === 1){
        capturer.start();
    } 

    let blurStrength = 3.4; // Adjust blur strength as needed

    for (let i = 0; i < entityCount; i++) {

        // Adjust flicker state randomly
        if (random(100) < 0.2) { // 0.2% chance to change flicker state
            flickerState[i] = 50; // Set flicker state to 50 frames
        }

        if (flickerState[i] > 0) {
            flickerState[i]--; // Decrease flicker state
        }

        // Calculate opacity based on flicker state
        let alpha = flickerState[i] > 0 ? 30 : 170;

        // Apply some noise to the speed to create smoother movement
        let noiseX = noise(x[i] * 0.02, y[i] * 0.02) * 2 - 1;
        let noiseY = noise(y[i] * 0.02, x[i] * 0.02) * 2 - 1;

        x[i] += xSpeed[i] + noiseX;
        y[i] += ySpeed[i] + noiseY;

        // make the balls "bounce" off the edge
        if (x[i] < 0 || x[i] > width) {
            xSpeed[i] = -xSpeed[i];
        }

        if (y[i] < 0 || y[i] > height) {
            ySpeed[i] = -ySpeed[i];
        }

        if (alpha ==30){
        for (let blur = blurStrength; blur > 0; blur--) {
            let blurAlpha = map(blur, blurStrength, 0, 2, 20);
            fill(r[i], g[i], b[i], blurAlpha);
            noStroke();
            ellipse(x[i], y[i], size[i] + blur * random(2, 12));

            fill(r[i], g[i], b[i], alpha); // Set fill color with adjusted opacity
        noStroke();
        ellipse(x[i], y[i], random(0.4, 0.45) * size[i], random(0.4, 0.5) * size[i]);
        } }
    }

     if (record && frameCount < recordLength) {
        capturer.capture(canvas);
    } else if (record && frameCount === recordLength) {
        capturer.save();
        capturer.stop();
    } 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
