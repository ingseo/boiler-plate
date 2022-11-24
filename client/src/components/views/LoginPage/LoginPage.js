import React, { useState } from 'react'

function LoginPage() {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  // const [<상태 값 저장 변수>, <상태 값 갱신 함수>] = useState(<상태 초기 값>);
  // 기본적으로 useState, 즉 현재 상태의 값은 "" 없음이다. = Email, Password라는 부분에 들어가 있다.
  // setEmail, setPassword는 setState함수로, 아래와 같이 값을 변경하는데 이용한다.

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh', fontWeight: 'bold',
    }}>
      <form style={{display: 'flex', flexDirection: 'column',
      }}>
        <label>Email</label>
        <input style={{marginBottom: '10px', borderRadius: '10px', padding: '5px'}} type="email" value={Email} onChange={onEmailHandler} />
        {/* 타이핑할때, onChange라는 이벤트를 발생시켜서 state 값이 변화되고, state값이 변화되면 value값도 변화한다. */}
        <label>Password</label>
        <input style={{marginBottom: '10px', borderRadius: '10px', padding: '5px'}} type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button style={{
          cursor: 'pointer', border: '2px solid #333', borderRadius: '10px',
          padding: '5px', fontWeight: 'bold', backgroundColor: '#999', color: '#fff',
        }}>Login</button>
      </form>
    </div>
  )
}

export default LoginPage