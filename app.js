const fs = require("fs")
const composium = require('composium')
const express = require('express')
const app = express()
app.use(express.json())
fs.readdirSync('./content/').forEach(file => {
    composium.loadTemplate(
        file.substr(0, file.length - 5),
        fs.readFileSync('./content/' + file)
    )
    console.log(`Loaded: ${file}`)
})
app.get('/', (req, res) => res.send('demo is running'))
app.post('/templates/:name', (req, res) => {
  res.send(composium.compose(req.params.name, req.body))
})
app.listen(8080) 
