var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var scl = 8;
var cols = void 0,
    rows = void 0;
var xstart = void 0,
    ystart = void 0;
var zoff = 0;
var angleMultiplier = void 0;

var flowfield = void 0;

function setup() {
  createCanvas(600, 600);
  cols = round((width - width / 5) / scl);
  rows = round((height - height / 5) / scl);
  // cols = round((width + 50) / scl);
  // rows = round((height + 50) / scl);

  flowfield = new Array();
  initField();

  xstart = random(500);
  ystart = random(500);
  angleMultiplier = floor(random(1, 5));
}

function draw() {
  background('#ECEFF1');

  translate(width / 10 + scl / 2, height / 10 + scl / 2);
  // translate((scl-25)/2, (scl-25)/2);

  updateField();
  drawField();

  // noLoop();
}

function updateField() {
  var yoff = ystart;

  for (var y = 0; y < rows; y++) {
    var xoff = xstart;
    for (var x = 0; x < cols; x++) {
      var fieldIndex = x + y * cols;

      // let angle = cos(noise(xoff, yoff+frameCount*0.005, zoff)) * TWO_PI * 10;
      var angle = tan(noise(xoff, yoff + frameCount * 0.0009, sin(zoff))) * TWO_PI * 5;
      // let angle = noise(xoff, yoff, zoff) * TAU + (1*xoff*yoff) + (zoff*angleMultiplier);
      //let angle = sin(xoff * x + yoff * y + zoff * fieldIndex);
      //let angle = sin(xoff + yoff + zoff) * fieldIndex/2;
      //let angle = sin((x + y) * zoff);
      //let angle = sin((xoff + x) * (yoff + y) * zoff);

      var v = createVector(x + 0.5, y + 0.5).rotate(angle);
      //PVector v = PVector.fromAngle(angle);
      v.setMag(cos(noise(xoff, yoff, zoff)) * 15);
      //v.setMag(angle+5);
      //v.setMag(scl);
      //v.setMag(5);
      //v.setMag(scl*zoff+scl);
      //v.setMag(sin(noise(x, y))*TWO_PI);
      //v.setMag(zoff*yoff*xoff + scl + 1);

      //flowfield[fieldIndex].angle = v;
      flowfield[fieldIndex].showPos = flowfield[fieldIndex].startPos.copy().add(v);
      //flowfield[fieldIndex].showPos.add(v);

      // if (fieldIndex === 0 || fieldIndex === 1) {
      // 	console.log({angle});
      // 	console.log({v});
      // 	console.log(v.mag());
      // }

      // strokeWeight(1);
      // stroke(0, 10+(v.mag()*0.1));
      // push();
      // translate(x*scl, y*scl);
      // rotate(v.heading());
      // line(0, 0, scl/2 * (v.mag()*0.1), 0);
      // pop();

      xoff += 0.01;
    }
    yoff += 0.01;
  }

  zoff += 0.01;
}

function drawField() {
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var fieldIndex = x + y * cols;
      flowfield[fieldIndex].show();
    }
  }
}

function initField() {
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var fieldIndex = x + y * cols;
      flowfield[fieldIndex] = new GridPoint(createVector(x * scl, y * scl));
    }
  }
}

var GridPoint = function () {
  function GridPoint(newPos) {
    _classCallCheck(this, GridPoint);

    this.startPos = newPos;
    this.showPos = newPos;
    this.angle = p5.Vector.fromAngle(1);
  }

  _createClass(GridPoint, [{
    key: 'show',
    value: function show() {
      noStroke();
      fill('#e52f29');
      ellipse(this.showPos.x, this.showPos.y, 3, 3);
    }
  }]);

  return GridPoint;
}();

$('body').width($('div').width());