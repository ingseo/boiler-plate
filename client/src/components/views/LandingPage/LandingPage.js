import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
  //랜딩페이지에 들어오자마자, 아래 함수를 실행한다.
    useEffect(() => { // useEffect 함수는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 실행할 수 있도록 하는 Hook이다.
      axios.get('/api/hello') //get request를 서버에다 보낸다. 그것의 엔드포인트는 해당 주소이다.
      .then(response => console.log(response.data)) //보낸 다음에 서버에서 돌아오는 response를 콘솔창에 보여준다.
    }, [])


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh', fontWeight: 'bold',
    }}>시작 페이지</div>
  )
}

export default LandingPage