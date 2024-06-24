import 'App.css';
import { fileUploadRequest, postBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/request/board';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState, } from 'react';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBoardStore, useLoginUserStore } from 'stores/';
import './style.css';

//          component: 푸터 컴포넌트          //
export default function Header() {

  // state: cookie 상태 //
  const [cookies, setCookie] = useCookies();
  // state: 로그인 유저 상태 //
  const { loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();
  // state: 로그인 상태 //
  const [isLogin, setLogin] = useState<boolean>(false);
  // state : path 상태 //
  const { pathname } = useLocation();
  




  // funtcion : 네비게이트 함수 //
  const navigate = useNavigate();


  // state: 로그인 상태 //
    // state: 인증페이지 상태
  const [isAuthPage , setAuthPage] = useState<boolean>(false);
  // state: 메인페이지 상태
  const [isMainPage, setMainPage] = useState<boolean>(false);
  // state: 검색페이지 상태
  const [isSearchPage, setSearchPage] = useState<boolean>(false);
  // state: 게시물 상세 페이지 상태
  const [isBoardDetailPage, setBoardDetailPage] = useState<boolean>(false);
  // state: 게시물 작성 페이지 상태
  const [isBoardWritePage, setBoardWritePage] = useState<boolean>(false);
  // state: 게시물 수정 페이지 상태
  const [isBoardUpdatePage, setBoardUpdatePage] = useState<boolean>(false);
  // state: 유저 페이지상태
  const [isUserPage, setUserPage] = useState<boolean>(false);


  // event Handler : 로고 클릭 이벤트 처리 함수 //
  const onLogoClickHandler = () => {
     navigate(MAIN_PATH);
  }

  // componenet: 검색 버튼 컴포넌트 //
  const SearchButton = () => {
    //render: 검색 버튼 컴포넌트 렌더링

    // state: 검색어 버튼 요소 참조 상태 //
    const  searchButtonRef = useRef<HTMLDivElement | null>(null);
    // state: 검색 버튼 상태 //
    const  [status, setStatus] = useState<boolean>(false);
     // state: 검색어 상태 //
     const [word, setWord] = useState<string>('');
    //  state: 검색어 Path Variable 상태 //
     const { searchWord} = useParams();


  // event handler : 검색어 변경 이벤트 처리 함수
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value= event.target.value;
    setWord(value);
    }

  // event handler : 검색어 키 이벤트 처리 함수 //
  const onSearchWordkeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!searchButtonRef.current) return;
    searchButtonRef.current.click();
  }
  
  // event handler : 검색 버튼 클릭 이벤트 처리 함수
  const onSearchButtonClickHandler = () => {
    if(!status) {
       setStatus(!status);
      return;
    }   

    navigate(SEARCH_PATH(word));
  };

  // effect: 검색어 path가 변경될때마다 실행될 함수 //
  useEffect(() => {
    if(searchWord)
      setWord(searchWord);
      setStatus(false);
  }, [searchWord]);



    if (!status)
     
    //          render: 검색 컴포넌트 렌더링 (클릭 false)        //
      return (
        
        <div>
          <div className='icon-box' onClick={onSearchButtonClickHandler}>
            <div className='icon search-icon'></div>
          </div>
        </div>
      );
    //          render: 검색 컴포넌트 렌더링 (클릭 true)        //
      return (
        <div>
          <div className='header-search-input-box'>
            <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={word} onChange={onSearchWordChangeHandler}  onKeyDown={
              onSearchWordkeyDownHandler
            }/>
            <div ref={searchButtonRef} className='icon-box' onClick={onSearchButtonClickHandler}>
              <div className='icon search-icon'></div>
            </div>
          </div>
        </div>
      ); 

  }


  
  // component: 로그인 또는 마이페이지 버튼 컴포넌트 렌더링
      const MyPageButton= () => {
         
        // state : userEmail path variable 상태
        const { userEmail } = useParams();

        // event handler: 마이페이지 버튼 클릭 이벤트 처리 함수
        const onMyPageButtonClickHandler = () => {
          if (!loginUser) return;
          const {email} = loginUser;
          navigate(USER_PATH(email));
        }
        // event handler: 로그아웃 버튼 클릭 이벤트 처리 함수
        const onSignOutButtonClickHandler = () => {
          resetLoginUser();
          setCookie('accessToken','', {path: MAIN_PATH, expires: new Date()} )
          navigate(MAIN_PATH);
        }
        // event handler : 로그인 버튼 클릭 이벤트 처리 함수
        const onSignInButtonClickHandler = () => {
          setLogin(true);
          navigate(AUTH_PATH);
        }        



        if (loginUser && userEmail){
          // render : 로그아웃 버튼 컴포넌트 렌더링
          return (
            <div className='logout-button' onClick={onSignOutButtonClickHandler}>{'로그아웃'}</div>
          );
        }

        // state: 로그인 상태 //
        if (loginUser) {
        // render: 마이페이지 버튼 컴포넌트 렌더링
        return (
            <div className='mypage-button' onClick={ onMyPageButtonClickHandler}>{'마이페이지'}</div>
          );
        }
        // state: 로그아웃 상태 // 
        // render: 로그인 버튼 컴포넌트 렌더링
        return (
          <div className='login-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
        );
       
      }

    // component : 업로드 버튼 컴포넌트 //
    const UploadButton = ()=> {

    //          state: 게시물 번호 path variable 상태          //
    const { boardNumber } = useParams();
    //          state: 게시물 제목, 내용, 이미지 전역 상태          //
    const { title, contents, boardImageList, resetBoard } = useBoardStore();

    //          function: post board response 처리 함수          //
    const postBoardResponse = (code: string) => {
      if (code === 'VF') alert('모두 입력하세요.');
      if (code === 'NU' || code === 'AF') {
        navigate(AUTH_PATH);
        return;
      }
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      resetBoard();
      if (!loginUser) return;
      const { email } = loginUser;
      navigate(USER_PATH(email));
    }
    //          function: patch board response 처리 함수          //
    const patchBoardResponse = (code: string) => {
      if (code === 'NU' || code === 'AF') {
        navigate(AUTH_PATH);
        return;
      }
      if (code === 'NB') {
        alert('존재하지 않는 게시물입니다.');
        navigate(MAIN_PATH);
        return;
      }
      if (code === 'NP') {
        alert('권한이 없습니다.');
        navigate(MAIN_PATH);
        return;
      }
      if (code === 'VF') alert('모두 입력하세요.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      if (!boardNumber) return;
      navigate(BOARD_DETAIL_PATH(boardNumber));
    }
        // event Handler: 업로드 버튼 클릭 이벤트 처리 함수 //
        const onUploadButtonClickHandler= async ()=> {
              const accessToken = cookies.accessToken
              if (!accessToken) return;

              const boardImageFileList: string[] = [];

    
              for (const image of boardImageList) {
                  const data = new FormData();
                  data.append('file', image);
               
                  const url = await fileUploadRequest(data);
          
                  if (url) boardImageFileList.push(url);
                }

                const requestBody: PostBoardRequestDto = {
                  title, content: contents, boardImageList: boardImageFileList
                }
                console.log("console", requestBody)
                postBoardRequest(requestBody, accessToken).then(postBoardResponse);
              }
      

        
        // render : 업로드 버튼 컴포넌트 렌더링
        if(title&&contents)
        return <div className='upload-button'  onClick={onUploadButtonClickHandler}>{'업로드'}</div>
        // render : 업로드 버튼 컴포넌트 렌더링
        return <div className='upload-button-disable'> {'업로드'}</div>
      
      }

  // effect: path가 변경될 때마다 실행될 함수 //
       useEffect(() => {
        //          variable: 인증 페이지 논리 변수          //
        const isAuthPage = pathname === (AUTH_PATH);
        setAuthPage(isAuthPage);
        //          variable: 메인 페이지 논리 변수          //
        const isMainPage = pathname === (MAIN_PATH);
        setMainPage(isMainPage);
        //          variable: 검색 페이지 논리 변수          //
        const isSearchPage = pathname === (SEARCH_PATH(''));
        setSearchPage (isSearchPage );
        //          variable: 게시물 상세 페이지 논리 변수          //
        const isBoardDetailPage = pathname === (BOARD_DETAIL_PATH(''));
        setBoardDetailPage(isBoardDetailPage);
        //          variable: 게시물 작성 페이지 논리 변수          //
        const isBoardWritePage = pathname === (BOARD_WRITE_PATH);
        setBoardWritePage(isBoardWritePage);
        //          variable: 게시물 수정 페이지 논리 변수          //
        const isBoardUpdatePage = pathname === (BOARD_UPDATE_PATH(''));
        setBoardUpdatePage(isBoardUpdatePage);
        const isUserPage = pathname === (USER_PATH(''));
        setUserPage(isUserPage);

       },[pathname]);  



  //          render: 헤더 레이아웃 렌더링        //
  return (
    <div id='header'>
      <div className='header-container'>
          <div className='header-left-box' onClick={onLogoClickHandler}>
                <div className='icon-box' >
                    <div className='icon logo-dark-icon' > </div>
                </div>
                <div className='header-logo'>{'Yellow Board'}       
                </div>
          </div>
          <div className='header-right-box'>
          { isAuthPage && (<SearchButton />) }
          { isMainPage && (<><SearchButton /><MyPageButton /></>) }
          { isSearchPage && (<><SearchButton  /><MyPageButton/></>) }
          { isBoardDetailPage && (<><SearchButton  /><MyPageButton /></>) }
          { isUserPage && (<MyPageButton />) }
          { isBoardWritePage && (<UploadButton />) }
          { isBoardUpdatePage && (<UploadButton />) }

          </div>
      </div>
    </div>
  )
}