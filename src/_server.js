import * as api from './node_modules/api'

import 'dotenv/config'
import io from 'socket.io'
import http from 'http'
import bodyParser from 'body-parser'

const fetch = require('node-fetch')
const webPush = require('web-push')
const express = require('express')

const { PORT, NODE_ENV} = process.env;
const server = http.createServer()



if(process.env.VAPID_PUBLIC && process.env.VAPID_PRIVATE){
  webPush.setVapidDetails(
    'mailto:edge3769@gmail.com',
    process.env.VAPID_PUBLIC,
    process.env.VAPID_PRIVATE
  )
}

express({server})
  .use(httpsRedirect, bodyParser.json())
  .get('/get', (req, res)=>{
    if(!process.env.VAPID_PUBLIC || !process.env.VAPID_PRIVATE){
      res.sendStatus(500)
    }
    res.end(process.env.VAPID_PUBLIC)
  })
  .put('/send', async(req, res) => {
    let id = req.body.id
    let {subs} = await api.get(`subs/${id}`) || []
    const options = {
      TTL: 5184000
    }
    for (let sub of subs){
      let json = {id: id}
      let payload = JSON.stringify(json)
        webPush.sendNotification(sub, payload, options).catch(err => {
          console.log('webpush error', err)
        })
    }
  })
  .listen(PORT)

io(server).on('connection', (socket)=>{
  socket.on('join', (id)=>{
    socket.join(id)
  })

  socket.on('msg', (obj)=>{
    socket.to(obj.id).emit('msg', obj)
    fetch('/send', {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({'id': obj.id})
    })
  })
})