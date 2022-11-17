const {User} = require('../models/User');

let auth = (req, res, next) => {

    // 인증 처리 (클라이언트 <-> 데이터베이스 토큰 비교)

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
    
    // 토큰을 복호화해서 user_id를 찾는다.
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error: true})
        //index get 안쪽 함수에서 리퀘스트에서 받을 때 token과 user를 사용할 수 있게 하려고 넣어주는 것
        req.token = token;
        req.user = user; 
        next(); // middleware에서 그 다음으로 넘어갈 수 있게 넣어줌. 안넣어줄 경우 미들웨어에 갇혀버림
    })

    // user_id가 있으면 인증 Okey

    // user_id가 없으면 인증  No!

}

module.exports = {auth}