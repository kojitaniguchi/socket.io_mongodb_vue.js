"use strict"
// var model = require('./model')
// var EighteenApr = model.EighteenApr
// var EighteenMay = model.EighteenMay
// var EighteenJun = model.EighteenJun
// var User = model.User
//
// for ( var i = 30  i<31   i++ ) {
//   console.log(i)
//   var i = new EighteenApr({
//     _id: i,
//     date: '4/' + String(i),
//     ten: [{ reservation: false, user_id: '' }],
//     ten_half: [{ reservation: false, user_id: '' }],
//     eleven: [{ reservation: false, user_id: '' }],
//     eleven_half: [{ reservation: false, user_id: '' }],
//     twelve: [{ reservation: false, user_id: '' }],
//   })
//
//   i.save(function(err) {
//     if (err) throw err
//   })
// }

// EighteenApr.update(
//   { id: 2 },
//   { $set: { ten: [{ reservation: true }]} },
//   function(err) {
//     if (err) throw err
//   }
// )

const mongo = require("mongodb")
const mongodbUri = "mongodb://127.0.0.1:27018/test1"

// mongo.MongoClient.connect (mongodbUri, (err, client) => {
// const db = client.db('test1')
//   db.collection('eighteenaprs', function(err, collection) {
//       for (var i = 1  i < 31  i++) {
//         collection.insert({
//           _id: i,
//           date: '4/' + String(i),
//           ten: [{ reservation: 0, user_id: '' }],
//           ten_half: [{ reservation: 0, user_id: '' }],
//           eleven: [{ reservation: 0, user_id: '' }],
//           eleven_half: [{ reservation: 0, user_id: '' }],
//           twelve: [{ reservation: 0, user_id: '' }],
//         })
//       }
//   })
// })

mongo.MongoClient.connect (mongodbUri, (err, client) => {
const db = client.db('test1')
  db.collection('eighteenaprs', function(err, collection) {
    // updateDB(db, collection, 1, 'ten', 1, '123456')
    // test(collection)
    update(collection)
    return
  })
})



function update(collection) {
  collection.update({ _id: 1 }, { $set: { ten: [{ reservation: 0, user_id: '123' }]} })
}

// function test(collection) {
//   collection.find({}, {tailable:true, awaitdata:true, numberOfRetries:-1}).each((err, doc) => {
//     console.log(doc)
//   })
// }
//
// function dropDatabase(collection) {
//   collection.drop()
//   console.log(collection.isCapped())
// }
//
// function updateDocument(exDatabase, index, date, newReservation, newUser_id) {
//   exDatabase[index-1][date][0].reservation = newReservation
//   exDatabase[index-1][date][0].user_id = newUser_id
//
//   return exDatabase
// }
//
// function insertDatabase(db, collection, newDatabase) {
//   db.createCollection("eighteenaprs", {capped:true, size:100000, max:10000})
//   collection.insert(newDatabase)
// }
//
// function updateDB(db, collection, index, date, newReservation, newUser_id)  {
//    collection.find({}).sort({ _id: 1 }).toArray((err, doc) => {
//     let exDatabase = doc
//     let newDatabase =  updateDocument(exDatabase, index, date, newReservation, newUser_id)
//     console.log('--- newDatabase ---')
//     dropDatabase(collection)
//     console.log('--- dropDatabase ---')
//     // insertDatabase(db, collection, newDatabase)
//     console.log(collection.state)
//   })
// }
