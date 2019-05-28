'use strict'

const express = require('express')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const dns = require('dns')
const validUrl = require('valid-url')
const shortid = require('short-id')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Array containing the long URLs and the corresponding shortened URLs
let urlMapping = [{"long_url": "sample_long_url", "short_url": "sample_short_url"}]

const isRecorded = (provided_long_url) => {
  let is_Recorded = [] = urlMapping.map((item) => { return item.long_url === provided_long_url })
  console.log(is_Recorded)
} 

app.post('/api/shorturl/new', (req, res) => {
  
  if (!validUrl.isUri(req.body.url)) res.json({ "error": "invalid URL" })
  
  else if (isRecorded(req.body.url)) {
    // res.json({ "original_url": req.body.url, "short_url": '/api/shorturl/' + short_url })
  }
  
  else {
    let req_id = req.headers['x-request-id']
    let short_url = req_id.substr(req_id.length - 4)
    urlMapping.push({"long_url": req.body.url, "short_url": short_url})
    res.json({"original_url": req.body.url, "short_url": '/api/shorturl/' + short_url })
  }
  
})

app.get('api/shorturl/:short_url', (req, res) => {
  console.log(req.headers.short_url)
  res.redirect()
})

app.listen(port)