const express = require("express")
const cors = require("cors")
const app = express()
const { getHTML, getNews } = require('./controller')




app.use(cors())
app.use(express.json())
app.use(express.static('client'))

app.get('/', getHTML)
app.get('/api/news', getNews)





app.listen(4000,console.log("Server running on 4000"))