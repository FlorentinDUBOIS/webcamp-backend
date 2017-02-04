const express = require('express')
const fetch = require('node-fetch')
const app = express()

function getData(done) {
    fetch('https://oil.florentin-dubois.fr')
        .catch(done)
        .then(function(response) {
            return response.json()
        })

        .then(function (json) {
            done(null, json)
        })
}

let cache
setInterval(function () {
    getData(function(error, json) {
        if (error) {
            return console.error(error.message)
        }

        cache = json
    })
}, 10.5 * 60 * 1000)

getData(function(error, json) {
    if (error) {
        return console.error(error.message)
    }

    cache = json
})

app.get('/api/station', function(req, res) {
    res.json(cache.pdv_liste.pdv)
})

app.get('/api/station/:id', function(req, res) {
    res.json(cache.pdv_liste.pdv.find(item => item.id == req.params.id))
})

module.exports = app