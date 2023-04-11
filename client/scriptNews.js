let body = document.querySelector("body")
let GetNews = document.getElementById("GetNews")
let div1 = document.getElementById("first")
let div2 = document.getElementById("second")

let NewsGetter = () =>{
  axios.get("/api/news/").then(res =>{
    div1.innerHTML = ''
    div2.innerHTML = ''
    let { data } = res 
    data.forEach((news,index) => {
      let { url, Image, Title } = news
      let article = document.createElement("a")
      article.href = url
      article.target = "blank"
      article.innerHTML = `<article><img src="${Image}" alt="Image goes here"><p>${Title}</p></article>`

      if ( (document.documentElement.scrollHeight) <500 || (document.documentElement.scrollWidth) <821 ){
        if(index % 2 === 0){
          div1.appendChild(article)
        }
      }
      else if (index % 2 === 0) {
        div1.appendChild(article)
      } else {
        div2.appendChild(article)
      }
    })
    
  })
}

GetNews.addEventListener('click', NewsGetter)


