let record = false;

let startingFrame   = 60;
let recordingLength = 5; // in seconds

let ballCount = 200;

let x = [];
let y = [];
let size = [];
let xSpeed = [];
let ySpeed = [];
let r = [];
let g = [];
let b = [];

let resolutionX = 360;
let resolutionY = 800;

function setup(){
    // put setup code here
    createCanvas(windowWidth, windowHeight);

    for (let i =0; i < ballCount; i++){
        x[i] = randomGaussian(0.5*width, 50);
        y[i] = randomGaussian(0.75*height, 50);

        xSpeed[i] = random(-1, 1);
        ySpeed[i] = random(-1, 1);

        size[i] = random(20,40);
        r[i] = random(220,255);
        g[i] = random(80,140);
        b[i] = random(0,40);
    }
}

function draw(){
    // put drawing code here
    if (record && frameCount === startingFrame){
        capturer.start()
    }

    background(35, 60);

    blendMode(BLEND);
    for(let i=0; i < ballCount; i++){
        
        x[i] = x[i] + xSpeed[i]
        y[i] = y[i] + -randomGaussian(0.6, 1)

        // make the balls "bounce" off the edge
        if(x[i] < 0 || x[i] > width){
            xSpeed[i] = -xSpeed[i]
        }
        // 
        if(y[i] < 0 || y[i] > height){
            ySpeed[i] = -ySpeed[i]
        }

        fill(r[i], g[i], b[i], 60);
        ellipse(x[i], y[i], random(0.4,0.45)*size[i], random(0.4,0.5)*size[i]);
        
        fill(r[i], g[i], b[i], random(4,20));
        noStroke();
        ellipse(x[i], y[i], size[i], size[i]);
     
    }

    if (record && frameCount < startingFrame + 60*recordingLength) {
        capturer.capture(canvas)
    } else if (record && frameCount === startingFrame + 60*recordingLength) {
        capturer.save()
        capturer.stop()
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}