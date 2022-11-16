const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const config = require('./config/key')

const { User } = require('./models/User');

//bodyparser = 클라이언트에서 오는 정보를 분석해서 가져올 수 있게 해주는 역할
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded 타입의 데이터를 분석
app.use(bodyParser.json()); // application/jseon 타입의 데이터를 분석
app.use(cookieParser());


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

app.post('/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err,user) => { //몽고DB에서 제공하는 메소드
    if(!user){
      return res.json({
        loginSuccess: false,
        massage: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => { //comparePassword는 지정메소드가 아니기 때문에 이름은 바꿔도 된다. 단 User.js에서도 바꿔줘야한다.
      if(!isMatch){
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      }
       // 비밀번호까지 맞다면 토큰을 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err) // status(400) = 에러

        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 등등..
        res.cookie("x_auth", user.token)
        .status(200) // 성공했다는 표시
        .json({loginSuccess: true, userId: user._id}) //데이터 보내준다.
    
      })
    })
  })
})






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})