const express = require('express')
const app = express()
const station = require('./serveur/stations')

app.use('/', express.static('client'))
app.use(station)

app.listen(8080)