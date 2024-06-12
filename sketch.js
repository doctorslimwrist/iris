function setup(){
    // put setup code here

    createCanvas(500, 400);
}

function draw(){
    // put drawing code here
    background(220);
    stroke(200);
    line(0, height/2, width, height/2);
    line(width/2, 0, width/2, height);

    fill('#235456');
    circle(width/4, 3*height/4, 125);

    fill('lavender');
    circle(3.2*width/4, 1.2*height/4, 125);

    fill('turquoise')
    square(3*width/4, 3*height/4, 65, 15)
}