var STAR_COUNT = (window.innerWidth + window.innerHeight) / 8,
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


let Songs = [{
  "Name": "Kujaku",
  "Source": "./Songs/Kujaku.mp3"
},
{
  "Name": "Warrior",
  "Source": "./Songs/1samurai.mp3"

}]


let randomIndex = (Math.floor(Math.random() * 2))
let songSource = Songs[randomIndex].Source
let songName = Songs[randomIndex].Name
let nowPlaying = document.querySelector("p")
nowPlaying.textContent=(`Now playing: ${songName}`)
document.querySelector("audio").src = songSource




let visualizer = ()=>{
    let maxBarNumber = 120
    if ( (document.documentElement.scrollHeight) <500 || (document.documentElement.scrollWidth) <700 ){
      maxBarNumber = 60

    }
    let audio = document.querySelector("audio")
    audio.onplay = function(){audio.volume = 0.3
      let context = new AudioContext
      let source = context.createMediaElementSource(audio)
      let analyzer = context.createAnalyser()
      source.connect(analyzer)
      source.connect(context.destination)
      let frequencydata = new Uint8Array(analyzer.frequencyBinCount)
      analyzer.getByteFrequencyData(frequencydata)
      
      
      let visualizerContainer = document.querySelector(".visualizer-container")
      for(let i=0; i<maxBarNumber; i++){
          let bar = document.createElement("div")
          bar.setAttribute("id", "bar" + i)
          bar.setAttribute("class", "visualizer-container__bar")
          visualizerContainer.appendChild(bar)
  
      }
  
      function renderFrame(){
          analyzer.getByteFrequencyData(frequencydata)
          for(let i=0; i<maxBarNumber; i++){
              let index = (i+70)*4
              let fd = frequencydata[index]
              let bar = document.querySelector("#bar"+i)
              if( !bar ){
                 continue
              }
  
              let barHeight = Math.max(4, fd || 0)
                  bar.style.height = barHeight + "px"
          }
          window.requestAnimationFrame(renderFrame)
      }
      renderFrame()}
    
}
// document.querySelector("button").onclick=visualizer


visualizer()

