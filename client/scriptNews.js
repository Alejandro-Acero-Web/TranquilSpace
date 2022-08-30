var STAR_COUNT = (window.innerWidth + window.innerHeight) / 20,
STAR_SIZE = 3,
STAR_MIN_SCALE = 0.2,
OVERFLOW_THRESHOLD = 50;

var canvas = document.querySelector('canvas'),
context = canvas.getContext('2d');

var scale = 1, // device pixel ratio
width = void 0,
height = void 0;

var stars = [];

var pointerX = void 0,
pointerY = void 0;

var velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };

var touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {

  for (var i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE) });

  }

}

function placeStar(star) {

  star.x = Math.random() * width;
  star.y = Math.random() * height;

}

function recycleStar(star) {

  var direction = 'z';

  var vx = Math.abs(velocity.x),
  vy = Math.abs(velocity.y);

  if (vx > 1 || vy > 1) {
    var axis = void 0;

    if (vx > vy) {
      axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
    } else
    {
      axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
    }

    if (axis === 'h') {
      direction = velocity.x > 0 ? 'l' : 'r';
    } else
    {
      direction = velocity.y > 0 ? 't' : 'b';
    }
  }

  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

  if (direction === 'z') {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  } else
  if (direction === 'l') {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else
  if (direction === 'r') {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else
  if (direction === 't') {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  } else
  if (direction === 'b') {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }

}

function resize() {

  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach(placeStar);

}

function step() {

  context.clearRect(0, 0, width, height);

  update();
  render();

  requestAnimationFrame(step);

}

function update() {

  velocity.tx *= 0.96;
  velocity.ty *= 0.96;

  velocity.x += (velocity.tx - velocity.x) * 0.8;
  velocity.y += (velocity.ty - velocity.y) * 0.8;

  stars.forEach(function (star) {

    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    // recycle when out of bounds
    if (star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD) {
      recycleStar(star);
    }

  });

}

function render() {

  stars.forEach(function (star) {

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.strokeStyle = 'rgba(255,255,255,' + (0.5 + 0.5 * Math.random()) + ')';

    context.beginPath();
    context.moveTo(star.x, star.y);

    var tailX = velocity.x * 2,
    tailY = velocity.y * 2;

    // stroke() wont work on an invisible line
    if (Math.abs(tailX) < 0.1) tailX = 0.5;
    if (Math.abs(tailY) < 0.1) tailY = 0.5;

    context.lineTo(star.x + tailX, star.y + tailY);

    context.stroke();

  });

}

function movePointer(x, y) {

  if (typeof pointerX === 'number' && typeof pointerY === 'number') {

    var ox = x - pointerX,
    oy = y - pointerY;

    velocity.tx = velocity.tx + ox / 12 * scale * (touchInput ? 1 : -1);
    velocity.ty = velocity.ty + oy / 12 * scale * (touchInput ? 1 : -1);

  }

  pointerX = x;
  pointerY = y;

}

function onMouseMove(event) {

  touchInput = false;

  movePointer(event.clientX, event.clientY);

}

function onTouchMove(event) {

  touchInput = true;

  movePointer(event.touches[0].clientX, event.touches[0].clientY, true);

  event.preventDefault();

}

function onMouseLeave() {

  pointerX = null;
  pointerY = null;

}


let body = document.querySelector("body")
let GetNews = document.getElementById("GetNews")
let div1 = document.getElementById("first")
let div2 = document.getElementById("second")

let NewsGetter = () =>{
  axios.get("http://localhost:4000/api/news/").then(res =>{
    div1.innerHTML = ''
    div2.innerHTML = ''
    let { data } = res 
    data.forEach((news,index) => {
      let { url, Image, Title } = news
      let article = document.createElement("a")
      article.href = url
      article.target = "blank"
      article.innerHTML = `<article><img src="${Image}" alt="Image goes here"><p>${Title}</p></article>`

      if(index % 2 === 0) {
        div1.appendChild(article)
      } else {
        div2.appendChild(article)
      }
    })
    
  })
}

GetNews.addEventListener('click', NewsGetter)


