
const axios = require('axios')
const topic = 'topstories'
const baseUrl = 'https://hacker-news.firebaseio.com/v0/'

function getItem(itemId) {
  return new Promise((resolve, reject) => {

    axios.get(`${baseUrl}item/${itemId}.json`)
      .then(response => {
        const {data} = response
        const {id, by, title, type, time} = data

        return resolve({
          id, 
          by,
          title,
          type,
          time
        })
      })
      .catch(err => reject(err))
  })
}

function getHNData() {
  return new Promise((resolve, reject) => {
    
    axios.get(`${baseUrl}${topic}.json`)
      .then(response => {
        const promises = []
        const _data = response.data.filter((item, idx) => idx < 20)  

        _data.forEach(item => {
          promises.push(getItem(item))

        })


        return resolve(Promise.all(promises))
      })
      .catch(err => reject(err))
  })
}

getHNData()
  .then(data => {
    console.log(data)
    process.exit(0)
  })