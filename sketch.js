let barWidth = 1;
let barcodeTop = 20;
let barcodeHeight = 50;


function setup() {
  createCanvas(500, 400);
}

function draw() {
  background(220);
  barcode(50,"048107193430");
  noLoop();
}
