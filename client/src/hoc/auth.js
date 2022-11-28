import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from '../_actions/user_action';
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null){
    //SpecificComponent = 페이지명
    //option?
    //null  => 아무나 출입이 가능한 페이지
    //true  => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지
    //adminRoute = true라고 할 경우 admin만 출입 가능한 페이지

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        const navigate = useNavigate();
        // auth api를 통해 미리 만들어둔 부분을 사용
        // auth middleware를 통과하며 쿠키안의 토큰을 통해 유저상태 판단
        useEffect(() => {
            //backend에서 처리해서 받아온 정보들은 모두 response안에 위치
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 분기
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){ //option === true 생략
                        navigate('/login')
                    }
                } else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){ //어드민이 아닌데 어드민만 들어갈 수 있는 페이지
                        navigate('/')
                    }else{
                        if(option === false)
                        navigate('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}