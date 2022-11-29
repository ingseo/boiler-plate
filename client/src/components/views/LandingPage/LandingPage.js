import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LandingPage() {

  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const isAuthBtn = user.userData.isAuth 

  //랜딩페이지에 들어오자마자, 아래 함수를 실행한다.
    useEffect(() => { // useEffect 함수는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook이다.
      axios.get('/api/hello') //get request를 서버에다 보낸다. 그것의 엔드포인트는 해당 주소이다.
      .then(response => console.log(response.data)) //보낸 다음에 서버에서 돌아오는 response를 콘솔창에 보여준다.
    }, [])

    const onClickHandler = () => {
      axios.get('/api/users/logout')
      .then(response => {
        if(response.data.success){
          navigate('/login')
        } else{
          alert('로그아웃하는데 실패했습니다.')
        }
      })
    }
    
  
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      flexDirection: 'column', width: '100%', height: '100vh',
    }}>
    
    <h2>시작 페이지</h2>
    <div style={{marginTop: '10px'}}>
      {isAuthBtn ? (
          <>
            <button id='logoutBtn' onClick={onClickHandler} style={{
              cursor: 'pointer', border: '2px solid #333', borderRadius: '10px',
              padding: '5px', fontWeight: 'bold', backgroundColor: '#999', color: '#fff',
            }}>Logout</button>
          </>
        ) : (
          <>
          </>
        )}
      
    </div>
    </div>
  )
}

export default LandingPage