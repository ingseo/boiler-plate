const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://inseo:ehxhfl@bolierplate.ttnkqah.mongodb.net/?retryWrites=true&w=majority', {
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 
    // 써주는 이유 : 오류안나게 하려고!..인데 쓰니까 오류나네..
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('err'))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})