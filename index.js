
const axios = require('axios')
const topic = 'topstories'
const baseUrl = 'https://hacker-news.firebaseio.com/v0/'


async function getItem(itemId) {
  const response = await axios.get(`${baseUrl}item/${itemId}.json`)
  const {data} = response
  const {id, by, title, type, time} = data

  return {
    id, 
    by,
    title,
    type,
    time
  }
}

async function getHNData() {
  const promises = []
  const response = await axios.get(`${baseUrl}${topic}.json`)
  const _data = response.data.filter((item, idx) => idx < 20)  

  _data.forEach(item => {
    promises.push(getItem(item))

  })

  const results = await Promise.all(promises)
  const _results = results.filter(item => item.type = 'story')

  return _results
}

getHNData()
  .then(data => {
    console.log(data)
    process.exit(0)
  })
