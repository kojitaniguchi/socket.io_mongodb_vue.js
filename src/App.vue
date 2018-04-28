<template>
  <div id="app">
    <h2>Realtime Calender</h2>
    <div>
      <b-table responsive striped hover bordered Fixed　:items="documents" :fields="fields">
      </b-table>
    </div>
  </div>
</template>

<script>
import 'babel-polyfill'

import io from 'socket.io-client'
const socket = io('localhost:3000')

const fields = [
  { key: 'date', label: '月/日' },
  { key: 'ten', label: '10:00' },
  { key: 'ten_half', label: '10:30' },
  { key: 'eleven', label: '11:00' },
  { key: 'eleven_half', label: '11:30' },
  { key: 'twelve', label: '12:00' }
]

function fetchData(requestUrl) {
  return  fetch(requestUrl)
    .then(checkStatus)
    .catch((error) => { error })
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function checkReservation (docArray) {
  docArray.forEach( (value, index, array) => {
    Object.keys(value).forEach((key) => {
      if (key !== 'date' && key !== '_id') {
        if (value[key][0].reservation == 0) {
          array[index][key] = '◯'
        }　else if (value[key][0].reservation == 1) {
          array[index][key] = '×'
        }
      }
    })
  })
}

function addCellClolor(docArray) {
  docArray.forEach( (value, index, array) => {
    let colorStatus = {}
      Object.keys(value).forEach((key) => {
        if (key !== 'date' && key !== '_id') {
          if (value[key] == '◯') {
            colorStatus[key] = 'success'
          }　else if (value[key] == '×') {
            colorStatus[key] = 'danger'
          }
        }
      })
    value._cellVariants = colorStatus
  })
}

function setFirstDocuments (data, documents) {
  data.forEach((value) => {
    documents.push(value)
  })
}

function addNewDocuments (newDocument, documents) {
  let index = newDocument[0]._id - 1
  documents.splice(index, 1, newDocument[0])
}

export default {
  name: 'app',
  data () {
    return {
      fields: fields,
      documents: []
    }
  },
  async created () {
    let requestUrl = '/api/documents'
    let data =  await fetchData(requestUrl)
      checkReservation (data)
      addCellClolor(data)
      setFirstDocuments(data, this.documents)
  },
  beforeMount() {
    socket.on('new-document', (newDocument) => {
      checkReservation (newDocument)
      addCellClolor(newDocument)
      addNewDocuments(newDocument, this.documents)
    })
  },
  head: {
    title: 'Nuxt.js with Socket.io'
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
