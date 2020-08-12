const encoding = [13, 25, 19, 61, 35, 49, 47, 59, 55, 11];
const mask = [64, 32, 16, 8, 4, 2, 1];

function barcode(x, code) {
  digits = toArray(code);
  quietZone(x - 9 * barWidth);
  x = guard(x);
  for (let i = 0; i < 6; i++) {
    x = digit(x, digits[i], false);
  }
  x = bar(x, false);
  x = guard(x);
  x = bar(x, false);
  for (let i = 6; i < 12; i++) {
    x = digit(x, digits[i], true);
  }
  x = guard(x);
  quietZone(x);
}

function digit(x, number, rightSide) {
  let pattern = encoding[number];
  if (rightSide) {
    pattern = pattern ^ 127; //if it is on the right side, invert the pattern
  }
  for (i = 0; i < 7; i++) {
    x = bar(x, (pattern & mask[i]) == mask[i]);
  }
  fill(255);
  rect(x,barHeight + barTop,-7*barWidth,-barWidth*8);
  fill(0);
  textSize(barWidth*8);
  textAlign(CENTER, BOTTOM);
  text(number, x-3.5*barWidth, barHeight + barTop);
  return x;
}

function bar(x, black) {
  noStroke();
  if (black) {
    fill(0);
  } else {
    fill(255);
  }
  rect(x, barTop, barWidth, barHeight);
  return x + barWidth;
}

function guard(x) {
  x = bar(x, true);
  x = bar(x, false);
  x = bar(x, true);
  return x;
}

function quietZone(x) {
  for (let i = 0; i < 9; i++) {
    bar(x + i * barWidth);
  }
  return x;
}

function checkDigit(code) {
  digits = toArray(code);
  let even = 0;
  let odd = 0;
  for (let i = 0; i < digits.length; i++) {
    if (i % 2) {
      odd += digits[i];
    } else {
      even += digits[i];
    }
  }
  sum = even + odd * 3;
  check = (10 - (sum % 10)) % 10;
  return check;
}

function toArray(input) {
  if (typeof input == "string") {
    return str(input).split("");
  } else {
    return input;
  }
}
