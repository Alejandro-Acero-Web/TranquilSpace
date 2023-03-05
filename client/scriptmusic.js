let Songs = [{
  "Name": "chilling",
  "Source": "./Songs/chilling.mp3"
},
{
  "Name": "documentary",
  "Source": "./Songs/documentary.mp3"
},
{
  "Name": "lifestyle",
  "Source": "./Songs/lifestyle.mp3"

},
{
  "Name": "nature",
  "Source": "./Songs/nature.mp3"

},
{
  "Name": "wind",
  "Source": "./Songs/wind.mp3"

},
]


let randomIndex = (Math.floor(Math.random() * 5))
let songSource = Songs[randomIndex].Source
let songName = Songs[randomIndex].Name
let nowPlaying = document.querySelector("p")
nowPlaying.textContent=(`Now playing: ${songName}`)
document.querySelector("audio").src = songSource




let visualizer = ()=>{
    let maxBarNumber = 120
    if ( (document.documentElement.scrollHeight) <500 || (document.documentElement.scrollWidth) <820 ){
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

