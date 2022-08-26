const path = require('path')

const { News } = require('../sources/run_results.json')




module.exports = {
    getHTML: (req,res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'))
    },
    getNews: (req, res) => {
        
        res.status(200).send(News[(Math.floor(Math.random()*180))])
        
        
    }
}


