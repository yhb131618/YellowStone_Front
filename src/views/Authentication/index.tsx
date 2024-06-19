import 'App.css';
import { signInRequest } from 'apis';
import { SignInRequestDto } from 'apis/request/auth';
import ResponseDto from 'apis/response';
import { SignInResponseDto } from 'apis/response/auth';
import InputBox from 'components/InputBox';
import { MAIN_PATH } from 'constant';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import './style.css';
//          component: 인증화면 페이지          //
export default function Authentication() {

  // state : 화면 상태
  const [view, setView] = useState<'sign-in'|'sign-up'>('sign-in');
  //          state: 쿠키 상태          //
  const [cookies, setCookie] = useCookies();

  // function: 네비게이트 함수 //
  const navigator = useNavigate();
  // component: sign in card 컴포넌트
  const SignInCard = () => {

      // state: 이메일 요소 참조 상태 //
      const emailRef = useRef<HTMLInputElement | null >(null);
      // state: 패스워드 요소 참조 상태 //
      const passwordRef = useRef<HTMLInputElement | null >(null); 

      // state: 이메일 상태 //
      const [email,setEmail] = useState<string>('');
      // state: 패스워드 상태 //
      const [password,setPassword] = useState<string>('');
      // state: 패스워드 타입 상태 //
      const [passwordType,setPasswordType] = useState<'text' | 'password'>('password');
      // state: 패스워드 버튼 아이콘 상태 //
      const [passwordButtonIcon,setPasswordButtonIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-on-icon');
      // state: 에러 상태 //
      const [error,setError] = useState<boolean>(false);
    

      //          function: sign in response 처리 함수          //
      const signInResponse = (responseBody: SignInResponseDto | ResponseDto ) => {
        const {code } = responseBody;
        if (!responseBody){
          alert('네트워크 이상입니다.');
          return;
        }
         if (code === 'VF') alert('모두 입력해주세요.');
         if (code === 'SF') setError(true);
         if (code === 'DBE') alert('데이터베이스 오류입니다.');
         if (code !== 'SU') return;
      
         const { token,  expirationTime } = responseBody as SignInResponseDto;

         const now = new Date().getTime();
         const expires = new Date(now + expirationTime * 1000);
   
         setCookie('accessToken', token, { expires, path: MAIN_PATH });
         navigator(MAIN_PATH);
   
   
        }

      //          event handler: 이메일 인풋 key down 이벤트 처리          //
      const onEmailChagneHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const { value } = event.target;
        setEmail(value);
      }

      // event handler: 비밀번호 변경 이벤트 처리
      const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
         setError(false);
         const {value} = event.target;
         setPassword(value);
      }
  

      // event Handler: 로그인 버튼 클릭 이벤트 처리 //
      const onSignInButtonClickHandler = () => {
        const requestBody: SignInRequestDto = {email, password};
        signInRequest(requestBody).then((response) => signInResponse(response as SignInResponseDto | ResponseDto));
      }
      // event Handler: 회원가입 링크 클릭 이벤트 처리 //
      const onSignUpLinkClickHandler = () => {
        setView('sign-up');
      }
      // event Handler: 패스워드 버튼 클릭 이벤트 처리  //
      const onPasswordButtonClickHandler = () => {
        if (passwordType === 'text') {
          setPasswordType('password');
          setPasswordButtonIcon('eye-off-icon');
        }
        if (passwordType === 'password') {
          setPasswordType('text');
          setPasswordButtonIcon('eye-on-icon');
        }
      }
      //          event handler: 이메일 인풋 key down 이벤트 처리          //
      const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (!passwordRef.current) return;
        passwordRef.current.focus();
      }

      //          event handler: 비밀번호 인풋 key down 이벤트 처리          //
      const onPasswordKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
      }
      
      // render: sign in card 컴포넌트 
     return (
       <div className='auth-card'>
             <div className='auth-card-top'>
                <div className='auth-card-title-box'>
                  <div className='auth-card-title'>{'로그인'} </div>
                </div>
                <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChagneHandler} onKeyDown={onEmailKeyDownHandler} />

                <InputBox ref={passwordRef} label='비밀번호' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPasswordChangeHandler} icon={passwordButtonIcon} onKeyDown={onPasswordKeyDownHanlder}  />
             </div>
             <div className='auth-card-bottom'>
                <div className='auth-sign-in-error-box'>
                    <div className='auth-sign-in-error-message'>
                      {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
                    </div>
                </div>
                <div className='auth-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                <div className='auth-description-box'>
                    <div className='auth-description'>{'신규 사용자이신가요? '}<span className='description-emphasis' onClick={onSignUpLinkClickHandler}>{'회원가입'}</span>
                  
                    </div>
                </div>
             </div>
       </div>
        
     );
  };

// const Sign Up Card 컴포넌트 //
const SignUpCard = () => {


 

  // state: 이메일 요소 참조 상태 //
  const emailRef = useRef<HTMLInputElement | null>(null);
  // state: 패스워드 요소 참조 상태 //
  const passwordRef = useRef<HTMLInputElement | null>(null);
  // state: 패스워드 확인 참조 상태 //
  const passwordCheckRef = useRef<HTMLInputElement | null>(null);

  // state: 닉네임 요소 참조 상태 //
  const nickNameRef = useRef<HTMLInputElement | null >(null); 
  // state: 휴대전화 요소 참조 상태 //
  const telNumberRef = useRef<HTMLInputElement | null >(null);     
  // state: 주소 요소 참조 상태 //
  const addressRef = useRef<HTMLInputElement | null >(null);     
  // state: 주소 상세 요소 참조 상태 //
  const addressDetailRef = useRef<HTMLInputElement | null >(null);     


  // state: 페이지 번호 상태 //
  const [page, setPage] = useState<1 | 2>(1);

  // state: 이메일 상태 //
  const [email, setEmail] = useState<string>('');

  // state: 패스워드 상태 //
  const [password, setPassword] = useState<string>('');

  // state: 패스워드 확인 상태 //
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  // state: 패스워드 타입 상태 //
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

  // state: 패스워드 타입 확인 상태 //
  const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');

    //          state: 닉네임 상태          //
    const [nickname, setNickname] = useState<string>('');
    //          state: 닉네임 에러 상태          //
    const [nicknameError, setNicknameError] = useState<boolean>(false);
    //          state: 닉네임 에러 메세지 상태          //
    const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');

    //          state: 핸드폰 번호 상태          //
    const [telNumber, setTelNumber] = useState<string>('');
    //          state: 핸드폰 번호 에러 상태          //
    const [telNumberError, setTelNumberError] = useState<boolean>(false);
    //          state: 핸드폰 번호 에러 메세지 상태          //
    const [telNumbeErrorMessage, setTelNumberErrorMessage] = useState<string>('');

    //          state: 주소 상태          //
    const [address, setAddress] = useState<string>('');
    //          state: 주소 에러 상태          //
    const [addressError, setAddressError] = useState<boolean>(false);
    //          state: 주소 에러 메세지 상태          //
    const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');

    //          state: 상세 주소 상태          //
    const [addressDetail, setAddressDetail] = useState<string>('');

    //          state: 개인정보동의 상태          //
    const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);
    //          state: 개인정보동의 에러 상태          //
    const [agreedPersonalError, setAgreedPersonalError] = useState<boolean>(false);



  // state: 이메일 에러 상태 //
  const [isEmailError, setEmailError] = useState<boolean>(false);
  // state: 패스워드 에러 상태 //
  const [isPasswordError, setPasswordError] = useState<boolean>(false);
  // state: 패스워드 체크 에러 상태 //
  const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);

  // state: 이메일 메세지 에러 상태 //
  const [emailErrorMessage, setEmailErrorMessage] =useState<string>('');
  // state: 패스워드 메세지 에러 상태 //
  const [passwordErrorMessage, setPasswordErrorMessage] =useState<string>('');
  // state: 패스워드 확인 메세지 에러 상태 //
  const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] =useState<string>('');

  // state: 패스워드 버튼 아이콘 상태 //
  const [passwordButtonIcon,setPasswordButtonIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-on-icon');

  // state: 패스워드 버튼 확인 아이콘 상태 //
  const [passwordCheckButtonIcon,setPasswordCheckButtonIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-on-icon');
 

  // event handdler: 회원가입 버튼 클릭 이벤트 처리
  const onSignUpButtonClickHandler = () => {
     alert('회원가입');
  }  
   
  // function : 다음 주소 검색 팝업 오픈 함수
  const open = useDaumPostcodePopup();

  
  // event handler: 이메일 변경 이벤트 처리 //
  const onEmailChangehandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(false);
    setEmailErrorMessage('');
  }

  // event handler : 패스워드 변경 이벤트 처리 //
  const onPasswordChangehandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value} = event.target;
    setPassword(value); 
    setPasswordError(false);
    setPasswordErrorMessage('');   
  }

  // event handler : 패스워드 확인 변경 이벤트 처리 //
  const onPasswordCheckChangehandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value} = event.target;
    setPasswordCheck(value); 
    setPasswordCheckError(false);
    setPasswordCheckErrorMessage('');   
  }


  // event handler: 패스워드 버튼 클릭 이벤트 처리 //
  const onPasswordButtonClickhandler = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      setPasswordButtonIcon('eye-on-icon');
    }
    if (passwordType === 'text') {
      setPasswordType('password');
      setPasswordButtonIcon('eye-off-icon');
    }
  }
  // event handler: 패스워드 확인 버튼 클릭 이벤트 처리 //
  const onPasswordCheckButtonClickhandler = () => {
    if (passwordCheckType === 'text') {
      setPasswordCheckType('password');
      setPasswordCheckButtonIcon('eye-off-icon');
    }
    if (passwordCheckType === 'password') {
      setPasswordCheckType('text');
      setPasswordCheckButtonIcon('eye-on-icon');
    }
  }

 

  // event handler: 다음 단계 버튼 클릭 다운 이벤트 처리 //
  const onNextButtonClickHandler = () => {
    const emailPattern = /^[a-zZ-Z0-9]*@([-.])?[a-zA-Z0-9]*\.[a-zA-Z]{2,54$/
    const isEmailPattern = emailPattern.test(email);
    if(!isEmailPattern){
      setEmailError(true);
      setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
      }
    const isCheckedPassword = password.trim().length > 8;
    if(!isCheckedPassword) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요');
      
    }
    const isEqualPassword = password === passwordCheck;
    if (!isEqualPassword){
       setPasswordCheckError(true);
       setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.')
    }
    if( !isEmailPattern || !isCheckedPassword || !isEqualPassword) return;
    setPage(2);
  }
  // event handler: 이메일 키 다운 이벤트 처리 //
  const onEmailKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!emailRef.current) return;
    emailRef.current.focus();
  }

  
  // event handler: 패스워드 키 다운 이벤트 처리 //
  const onPasswordKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if(!nickNameRef.current) return;
    onNextButtonClickHandler();
    nickNameRef.current.focus();
    
  }

      
  // event handler: 닉네임 확인 키 다운 이벤트 처리 //
  const onNicnameKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if(!telNumberRef.current) return;
    telNumberRef.current.focus();

  }
  // event handler: 폰번호 확인 키 다운 이벤트 처리 //
  const onTelNumberKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onAddressButtonClickHandler();

  }

  // event handler: 주소 확인 키 다운 이벤트 처리 //
  const onAddressKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if(!addressDetailRef.current) return;
    addressDetailRef.current.focus();
  }

  // event handler: 상세주소 확인 키 다운 이벤트 처리 //
  const onAddressDtailKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    onSignUpButtonClickHandler();
  }





  // event handler: 닉네임 변경 이벤트 처리 //
  const onNickNameChangeHandler =(event: ChangeEvent<HTMLInputElement>) =>{
        const {value} = event?.target;
        setNickname(value);
        setNicknameError(false);
        setNicknameErrorMessage('');
  }

  // event handler: 핸드폰 변경 이벤트 처리 //
  const onTelNumberChangeHandler =(event: ChangeEvent<HTMLInputElement>) =>{
    const {value} = event?.target;
    setTelNumber(value);
    setNicknameError(false);
    setNicknameErrorMessage('');
}

  // event handler: 주소 변경 이벤트 처리 //
  const onAddressChangeHandler =(event: ChangeEvent<HTMLInputElement>) =>{
    const {value} = event?.target;
    setAddress(value);
    setAddressError(false);
    setAddressErrorMessage('');
}

  // event handler: 상세 주소 변경 이벤트 처리 //
  const onAddressDetailChangeHandler =(event: ChangeEvent<HTMLInputElement>) =>{
    const {value} = event?.target;
    setAddressDetail(value);

}

 // event handler: 주소 버튼 클릭 이벤트 처리 //
 const onAddressButtonClickHandler = () => {
    open({ onComplete});
 }

 // event handler: 개인 정보 동의 체크 박스 클릭 이벤트 처리 //
 const onAgreedPersonalClickHanddler = () => {
    setAgreedPersonal(!agreedPersonal);
    setAgreedPersonalError(false);

 }
  
  // event handler : 다음 주소 검색 완료 이벤트 처리 //
 const onComplete = (data : Address ) => {
   const { address } = data;
   setAddress(address);
   if (!addressDetailRef.current) return;
   addressDetailRef.current.focus();

 }


  // const Sign Up Card 컴포넌트 렌더링 //
  return (
    <div className='auth-card'>
       <div className='auth-card-box'>
          <div className='auth-card-top'>
             <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'회원가입'}</div>
                 <div className='auth-card-page'>{`${page}/2`}</div>
             </div>
                  {page === 2 && (
                    <div>
                  <InputBox ref={emailRef} label='이메일 주소*' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangehandler} error={isEmailError} message={emailErrorMessage} onButtonClick={onPasswordButtonClickhandler} onKeyDown={onEmailKeyDownHandler}/>
                  
                  <InputBox ref={passwordRef}  label='패스워드*' type={passwordType} placeholder='비밀번호를 확인해주세요.' value={password} onChange={onPasswordChangehandler} error={isPasswordError} message={passwordErrorMessage}
                  icon={passwordButtonIcon} onButtonClick={onPasswordCheckButtonClickhandler}onKeyDown={onPasswordKeyDownHandler}/>
                  
                  <InputBox ref={passwordCheckRef}  label='패스워드 확인*' type={passwordCheckType} placeholder='비밀번호 다시 입력해주세요.' value={passwordCheck} onChange={onPasswordCheckChangehandler}
                  error={isPasswordCheckError} message={passwordCheckErrorMessage}
                  icon={passwordCheckButtonIcon} onKeyDown={onPasswordCheckButtonClickhandler}/>
                    </div>
                  )}
                  {page ===1 && (
                    <div>
                      <InputBox label='닉네임*' type='text' ref = {nickNameRef} placeholder='닉네임을 입력해주세요.' value={nickname} onChange={onNickNameChangeHandler} error={nicknameError} message={nicknameErrorMessage} onKeyDown={onNicnameKeyDownHandler}/>

                      <InputBox label='핸드폰 번호*' type='text' 
                      ref = {telNumberRef} placeholder='핸드폰 번호를 입력해주세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={telNumberError} message={telNumbeErrorMessage} onKeyDown={onTelNumberKeyDownHandler} />

                      <InputBox label='주소*' type='text'ref = {addressRef} placeholder='우편번호 찾기' value={address} onChange={onAddressChangeHandler} icon='right-arrow-icon' error={addressError} message={addressErrorMessage} onButtonClick={onAddressButtonClickHandler} onKeyDown={onAddressKeyDownHandler} />

                      <InputBox label='상세 주소' type='text' ref = {addressDetailRef}  placeholder='상세 주소를 입력해주세요.' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false} onKeyDown={onAddressDtailKeyDownHandler} />

                      </div>
                    )}
              </div>      
            </div>
          
          <div className='auth-card-bottom'>
                {page === 2 && (               <div className='auth-button' onClick={onNextButtonClickHandler}>{'다음 단계'}</div>)}

                {page === 1 && (    
                  <div>
                  <div className='auth-consent-box'>
                    <div className='auth-check-box'>
                      <div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>
                    </div>
                    <div className={agreedPersonalError ? 'auth-consent-title-error' : 'auth-consent-title'}>{'개인정보동의'}</div>
                    <div className='auth-consent-link'>{'더보기>'}</div>
                    
                  </div>
                  <div className='auth-button' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                </div>
                )}
        
               <div className='auth-description-box'>
                <div className='auth-description'>{'이미 계정이 있으신가요? '}<span className='description-emphasis'onClick={ onSignUpButtonClickHandler} >{'로그인'}</span>
                </div> 
                </div> 
          </div>       
    
    </div>
  );
};
 

  // render: 인증화면 컴포넌트 렌더링 //
  return (
    <div id='auth-wrapper'>
        <div className='auth-container'>
          <div className='auth-jumbotron-box'>
              <div className='auth-jumbotron-contents'>
                 <div className='auth-logo-icon'></div>
                 <div className='auth-jumbotron-text-box'>
                    <div className='auth-jumbotron-text'>{'Yellow Stone 커뮤니티'}</div>
                    <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
                 </div>
              </div>
            </div>
           {view === 'sign-in' && <SignInCard/>}
           {view === 'sign-up' && <SignUpCard/>}
        </div>
    </div>
  )
}

