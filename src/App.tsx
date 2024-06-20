import { getSignInUserRequest } from 'apis/request/';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import Container from 'layouts/Container';
import { useCookies } from 'react-cookie';
import { Route, Routes } from 'react-router-dom';
import { useLoginUserStore } from 'stores';
import Authentication from 'views/Authentication';
import BoardDetail from 'views/Board/Detail';
import BoardUpdate from 'views/Board/Update';
import BoardWrite from 'views/Board/Write';
import Main from 'views/Main';
import Search from 'views/Search';
import User from 'views/User';
import './App.css';

function App() {
  //          state: 현재 페이지 url 상태          //
 // const { pathname } = useLocation();
  //          state: 로그인 유저 상태          //
  const { loginUser, resetLoginUser } = useLoginUserStore();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();

  
    //          function: get sign in user response 처리 함수 //
    const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code !== 'SU') {
        setCookie('accessToken', '', { expires: new Date(), path: MAIN_PATH });
        resetLoginUser();
        return;
      }
  
      setLoginUser({ ...responseBody as GetSignInUserResponseDto });
    }
  
    //          effect: 현재 path가 변경될 때마다 실행될 함수          //
    useEffect(() => {
      const accessToken = cookies.accessToken;
      if (!accessToken) {
        resetLoginUser();
        return;
      }
  
      getSignInUserRequest(accessToken).then(getSignInUserResponse);
      
    }, [pathname]);

  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={MAIN_PATH} element={<Main />} />
        <Route path={AUTH_PATH} element={<Authentication />} />
        <Route path={SEARCH_PATH(':word')} element={<Search />} />
        <Route path={BOARD_WRITE_PATH} element={<BoardWrite />} />
        <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
        <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />
        <Route path={USER_PATH(':searchEmail')} element={<User />} />
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Route>
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