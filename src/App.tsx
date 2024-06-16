import { Route, Routes } from 'react-router-dom';
import Authentication from 'views/Authentication';
import Main from 'views/Main';
import User from 'views/User';
import './App.css';

function App() {

  return (
    <Routes>

        <Route path='/' element={<Main />} />
 
        <Route path='/auth' element={<Authentication />} />
        <Route path='/user' element={<User/>} />

    </Routes>
  );
}

export default App;

// ! 네비게이션 설계
// ! 메인 화면 : '/' - Main
// ! 로그인 화면 + 회원가입 화면 : /auth - Authentication
// ! 검색 화면 : '/search/:word' - Search
// ! 게시물 상세 보기 화면 : '/board/detail/:boardNumber' - BoardDetail
// ! 게시물 작성 화면 : '/board/write' - BoardWrite
// ! 게시물 수정 화면 : '/board/update/:boardNumber' - BoardUpdate
// ! 유저 게시물 화면 : '/user/:email' - User