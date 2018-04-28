const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'

// mongo -----------------------------------------------------------------------
const mongo = require('mongodb')
const mongodbUri = 'mongodb://127.0.0.1:27018/test1'

app.use(express.static('dist'))

app.get('/', express.static('dist'))

app.get('/api/documents', (req, res) => {
  mongo.MongoClient.connect (mongodbUri, (err, client) => {
  let db = client.db('test1')
    db.collection('eighteenaprs', (err, collection) => {
      collection.find({}).sort({ _id: 1 }).toArray((err, documents) => {
        res.json(documents)
      })
    })
  })
})

// Listen the server
server.listen(port, 'localhost')
console.log('Server listening on localhost:' + port) // eslint-disable-line no-console


mongo.MongoClient.connect (mongodbUri, (err, client) => {
  let db = client.db('test1')
  db.collection('eighteenaprs', (err, collection) => {
  // open socket----------------------------------------------------------------
      io.on("connection", (socket) => {

        // cahnge channel ------------------------------------------------------
        socket.on("changeChannel", (channel) => {
          if (channel == "all") { channel = undefined  }
          socket.channel = channel
        })

        // watch update -------------------------------------------------------
        const changeStream = collection.watch({ fullDocument: 'updateLookup' })
        changeStream.on('change', (change) => {
          let newDocument = []
          newDocument.push(change.fullDocument)
          if ( socket.channel == undefined ) {
                socket.emit("new-document", newDocument)
              } else if (doc.channel == socket.channel) {
                socket.emit("new-document", newDocument)
              }
        })
      })
  // -------------------------------------------------------------- end socket
  })
})

// // Socket.io
// let messages = []
// io.on('connection', (socket) => {
//
//   socket.on('last-documents', function (fn) {
//     console.log(fn);
//     fn(messages.slice(-50))
//   })
//
//   socket.on('send-message', function (message) {
//     console.log(message);
//     messages.push(message)
//     socket.broadcast.emit('new-message', message)
//   })
//
// })
