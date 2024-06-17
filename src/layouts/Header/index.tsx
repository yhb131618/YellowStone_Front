import { MAIN_PATH, SEARCH_PATH } from 'constant';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
//          component: 푸터 컴포넌트          //
export default function Header() {
  // funtcion : 네비게이트 함수 //
  const navigate = useNavigate();

  // event Handler : 로고 클릭 이벤트 처리 함수 //
  const onLogoClickHandler = () => {
     navigate(MAIN_PATH);
  }

  // componenet: 검색 버튼 컴포넌트 //
  const SearchButton = () => {
    //render: 검색 버튼 컴포넌트 렌더링


    // state: 검색 버튼 상태 //
    const  [status, setStatus] = useState<boolean>(false);
     // state: 검색어 상태 //
     const [searchWord, setsearchWord] = useState<string>('');


  // event handler : 검색 아이콘 클릭 이벤트 처리 함수
  const onSearchWordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value= event.target.value;
    setsearchWord(value);
    }
  
  // event handler : 검색 아이콘 클릭 이벤트 처리 함수
  const onSearchButtonClickHandler = () => {
    if(!status) {
      setStatus(!status);
      return;
    }
    navigate(SEARCH_PATH(searchWord));
  }

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
            <input className='header-search-input' type='text' placeholder='검색어를 입력해주세요.' value={searchWord} onChange={onSearchWordChangeHandler} />
            <div className='icon-box' onClick={onSearchButtonClickHandler}>
              <div className='icon search-icon'></div>
            </div>
          </div>
        </div>
      ); 

  }
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
                <SearchButton />
          </div>
      </div>
    </div>
  )
}