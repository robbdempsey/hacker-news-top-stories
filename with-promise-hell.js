
const axios = require('axios')
const topic = 'topstories'
const baseUrl = 'https://hacker-news.firebaseio.com/v0/'

function getHNData() {
  return new Promise((resolve, reject) => {
    const results = []
    
    axios.get(`${baseUrl}${topic}.json`)
      .then(response => {
        const _data = response.data.filter((item, idx) => idx < 20)  
        const total = _data.length
        let processed = 0

        _data.forEach(item => {

          axios.get(`${baseUrl}item/${item}.json`)
            .then(response => {
              const {data} = response
              const {id, by, title, type, time} = data

              results.push({
                id, 
                by,
                title,
                type,
                time
              })

              processed++

              if (processed === total) {
                return resolve(results)
              }

            })
            .catch(err => reject(err))
        })
      })
      .catch(err => reject(err))
  })
}

getHNData()
  .then(data => {
    console.log(data)
    process.exit(0)
  })