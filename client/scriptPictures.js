let GetPets = document.getElementById("GetPets")
let main = document.querySelector("main")
let petsgetter = () =>{
axios.post("/api/pets/").then(res =>{

  let randomHeight = res.data.height
  let randomWidth = res.data.width 
  
  let height = Math.floor((document.documentElement.scrollHeight) * 0.6)
  let width = Math.floor((document.documentElement.scrollWidth)*0.6)
  if ( (document.documentElement.scrollHeight) <500 || (document.documentElement.scrollWidth) <700 ){
    
    height = Math.floor(height*0.8)
  }
  main.innerHTML=`<img src="https://place-puppy.com/${width+randomWidth}x${height+randomHeight}" alt="Image goes here">`
})
}

GetPets.addEventListener('click', petsgetter)