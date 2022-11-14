const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//schema = 특정 정보를 지정해주는 일
//model = schema를 감싸주는 역할

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 스페이스바를 없애주는 역할
        unique: 1 // 똑같은건 쓰지 못하게!
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { //관리자, 일반유저 등
        type: Number, //넘버가 1이면 관리자, 0이면 일반유저 등
        default: 0 //role을 지정하지않는다면 0을 준다.
    },
    image: String, //이런식으로도 쓸 수 있음
    token: { // 유효성 관리에 사용
        type: String
    },
    tokenExp:{ //토큰의 유효기간
        type: Number
    }
})

//유저 모델에 유저 정보를 save하기 전에 함수를 작동한다!
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){ //비밀번호가 변경될 때에만 암호화 실행
        //salt 생성
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash // 패스워드를 hash로 교체
                next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User } //다른곳에서도 사용할 수 있게끔!