const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5050
const dbConfig = require('./config/DbConfig')
const cors = require('cors')
const path = require('path')

mongoose.connect(dbConfig.mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser : true
}).then(() => console.log("connect to mongodb"))
    .catch(err => console.log(err))

app.use(cors())

app.use(bodyParser.json({
    extended : true,
    limit : '50mb'
}))

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}))

app.use('/access', require('./routes/access'))
app.use('/profilephoto', express.static(path.join(__dirname, 'img')))

app.listen(port, function() {
    console.log('Server sedang berjalan pada port ' + port)
})