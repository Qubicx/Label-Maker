const encoding = [13, 25, 19, 61, 35, 49, 47, 59, 55, 11];
const mask = [64, 32, 16, 8, 4, 2, 1];

function barcode(x, code) {
  digits = toArray(code);
  quietZone(x - 9 * barWidth);
  x = guard(x);
  for (let i = 0; i < 6; i++) {
    x = digit(x, digits[i], false); //draw left digits
  }
  x = bar(x, false);
  x = guard(x);
  x = bar(x, false);
  for (let i = 6; i < 12; i++) {
    x = digit(x, digits[i], true); //draw right digits
  }
  x = guard(x);
  quietZone(x);
}

function digit(x, number, rightSide) { //creates a single digit starting at x
  let numberSize = barWidth*8
  let pattern = encoding[number];
  if (rightSide) {
    pattern = pattern ^ 127; //if it is on the right side, invert the pattern
  }
  for (i = 0; i < 7; i++) {
    x = bar(x, (pattern & mask[i]) == mask[i], barcodeHeight-numberSize);
  }
  fill(255);
  rect(x,barcodeHeight + barcodeTop,-7*barWidth,-numberSize); //add white space for text
  fill(0);
  textSize(numberSize);
  textAlign(CENTER, BOTTOM);
  text(number, x-3.5*barWidth, barcodeHeight + barcodeTop); //add numbers undereath the digits
  return x; //return x value for next digit
}

function bar(x, black, barHeight = barcodeHeight) { //creates a single bar starting at x
  noStroke();
  if (black) {
    fill(0);
  } else {
    fill(255);
  }
  rect(x, barcodeTop, barWidth, barHeight);
  return x + barWidth; //return x value for next bar
}

function guard(x) {
  x = bar(x, true);
  x = bar(x, false);
  x = bar(x, true);
  return x;
}

function quietZone(x) { //create a 9 bar wide quiet zone
  for (let i = 0; i < 9; i++) {
    bar(x + i * barWidth);
  }
  return x;
}
function pluCode(price) {
  let digits = toArray("2107074");
  let priceDigits = str(nf(floor(min(price,99.99)*100),4));
  for (let i = 0; i < 4; i++) {
    digits.push(priceDigits[i])
  }
  digits.push(str(checkDigit(digits)));
  return digits;
}

function checkDigit(code) { //generates a UPC-A check digit
  digits = toArray(code);
  let even = 0;
  let odd = 0;
  for (let i = 0; i < digits.length; i++) {
    if (i % 2) {
      odd += Number(digits[i]);
    } else {
      even += Number(digits[i]);
    }
  }
  sum = odd + even * 3;
  check = (10 - (sum % 10)) % 10;
  return check;
}

function toArray(input) { //formats an input into an array of digits cast as strings
  if (typeof input == "string") {
    return str(input).split("");
  } else {
    return input;
  }
}
