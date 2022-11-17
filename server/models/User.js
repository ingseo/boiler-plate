const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

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
    } else {
        next()
    }
})

//Bcrypt를 이용하여 plain password와 암호화된(Hashed) password가 같은지 확인
userSchema.methods.comparePassword = function(plainPassword, cb){ // cd = callback function
    //plainPassword 12345678    암호화된 비밀번호 $2b$10$eeDCbIo8ron8akXFNPqecOTBjxAP0BLNCnDCDR72d63tNC8lu8nGu
    //위 두개가 같은지 확인하기위해선 암호화된것을 복호화 할 수는 없기때문에 plainPassword를 암호화해서 같은지 확인해야함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString() , 'secretToken'); //user._id는 데이터 베이스에 존재하는 각각의 객체 아이디
    //user._id + 'secreatToken = token > 'secretToken'으로부터 user._id 알수있음'
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token" : token}, function(err, user){//findOne = 몽고DB 메소드
            if(err) return cb(err);
            cb(null, user)
        }) 
    }) 
}




const User = mongoose.model('User', userSchema)

module.exports = { User } //다른곳에서도 사용할 수 있게끔!