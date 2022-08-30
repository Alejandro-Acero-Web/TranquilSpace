const path = require('path')

const { News } = require('../sources/run_results.json')




module.exports = {
    getHTML: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'))
    },
    getNews: (req, res) => {
        let randInt = Math.floor(Math.random() * 167)
        let newsArr = [
            News[randInt],
            News[randInt + 1],
            News[randInt + 2],
            News[randInt + 3]
        ]
        
        res.status(200).send(newsArr)
        
        
    },
    getPicture: (req, res) => {
        let size = {
            height:Math.floor(Math.random()*(20 - 1) + 1 ),
            width:Math.floor(Math.random()*(20 - 1) + 1 )

        }
       res.status(200).send(size)
    }
 }


