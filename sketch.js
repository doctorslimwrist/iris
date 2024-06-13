let record = false; 
let recordLength = 10*60
let entityCount = 20;

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

    for (let i =0; i < entityCount; i++){
        x[i] = randomGaussian(0.5*width, 70);
        y[i] = randomGaussian(0.5*height, 50);
    
        xSpeed[i] = random(-0.7, 0.7);
        ySpeed[i] = random(-1.1, -0.5);

        size[i] = randomGaussian(15, 5);
        r[i] = random(140,155);
        g[i] = random(150,180);
        b[i] = random(0,40);
    }
}

function draw(){
    if (record && frameCount === 1){
        capturer.start();
    }
    background(5, 65);
    let blurStrength = 3.5; // Adjust blur strength as needed

    // blendMode(BLEND);
    for(let i=0; i < entityCount; i++){
        // Apply some noise to the speed to create smoother movement
        let noiseX = noise(x[i] * 0.02, y[i] * 0.02) * 2 - 1;
        let noiseY = noise(y[i] * 0.02, x[i] * 0.02) * 2 - 1;
        
        x[i] += xSpeed[i] + noiseX;
        y[i] += ySpeed[i] + noiseY;

        // Add damping to the speeds to simulate friction
        //xSpeed[i] *= randomGaussian(0.99, 0.02);
        //ySpeed[i] *= randomGaussian(0.99, 0.032);

        // make the balls "bounce" off the edge
        if(x[i] < 0 || x[i] > width){
            xSpeed[i] = -xSpeed[i];
        }
        
        if(y[i] < 0 || y[i] > height){
            ySpeed[i] = -ySpeed[i];
        }

        //r[i] += randomGaussian(-0.2,0.1);
        //g[i] += randomGaussian(-0.2,0.1);
        //b[i] += randomGaussian(0.2,0.5)
        noStroke();
        
        fill(r[i], g[i], b[i]);
        ellipse(x[i], y[i], random(0.4,0.45)*size[i], random(0.4,0.5)*size[i]);
        
        
         for (let blur = blurStrength; blur > 0; blur--) {
            let alpha = map(blur, blurStrength, 0, 2, 20);
            fill(r[i], g[i], b[i], alpha);
            noStroke();
            ellipse(x[i], y[i], size[i] + blur*random(2,15));
          } 

        
    }

    if (record && frameCount < recordLength) {
        capturer.capture(canvas);
    } else if (record && frameCount === recordLength) {
        capturer.save();
        capturer.stop();
    }
}
// Easing function
function easeInOut(t, amount) {
    return t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2;
}


function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}
