let name;

let labelWidth = 216;
let labelHeight = 116;
let scaleFactor = 4;

let barWidth = 1;
let barcodeTop = 70;
let barcodeHeight = 40;

function setup() {
  pixelDensity(1);
  scaleFactor = floor(windowWidth / labelWidth / 1.5);
  createCanvas(labelWidth * scaleFactor, labelHeight * scaleFactor);
  nameInput = createInput("Item Name");
  nameInput.parent(createDiv("Name: "));
  sizeInput = createSlider(16, 36, 24);
  sizeInput.parent(createDiv("Text Size: "));
  priceInput = createInput("2.99");
  priceInput.parent(createDiv("Price: "));
  createDiv();
  printButton = createButton("Print");
  printButton.mouseClicked(finalize);
}

function draw() {
  let name = nameInput.value();
  let nameSize = sizeInput.value();
  let price = min(Number(priceInput.value()),99.99);
  scale(scaleFactor);
  background(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(nameSize);
  fill(0);
  text(name, 10, 0, labelWidth - 20, 65);
  textAlign(LEFT, CENTER);
  textSize(24);
  text("$" + nf(price, 0, 2), 10, 90);
  barcode(100, pluCode(price));
}

function finalize() {
  noLoop();
  createCanvas(labelWidth, labelHeight, SVG);
  scaleFactor = 1;
  redraw();
  removeElements();
  window.print();
}
