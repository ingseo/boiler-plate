const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config/key')

const { User } = require('./models/User');

//bodyparser = 클라이언트에서 오는 정보를 분석해서 가져올 수 있게 해주는 역할
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded 타입의 데이터를 분석
app.use(bodyParser.json()); // application/jseon 타입의 데이터를 분석

mongoose.connect(config.mongoURI, {
    // 몽고DB 연결
    useNewUrlParser: true,
    useUnifiedTopology: true
    // 써주는 이유 : 오류안나게 하려고!
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('err'))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요~ hi')
})

app.post('/register', (req, res)  => {
  // 목표 : 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.
  
    const user = new User(req.body) //request body로 클라이언트에 보내는 정보를 받는다.

    user.save((err, userInfo) => {//몽고DB에서 오는 메소드. save. 정보들이 user 모델에 저장.
      if(err) return res.json({success: false, err}) //에러가 났을 때 에러메시지 전달
      return res.status(200).json({ // status(200) = 성공
        success: true
      })
    })
})








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})