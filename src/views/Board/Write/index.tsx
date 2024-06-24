import 'App.css';
import { MAIN_PATH } from 'constant';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useBoardStore } from 'stores';
import './style.css';

//          component: 게시물 작성 화면          //
export default function BoardWrite() {

  //          state: 이미지 인풋 ref 상태          //
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  //          state: 쿠키 상태           
  const [cookies, setCookie] = useCookies();

  //          state: 본문 텍스트 영역 ref 상태          //
  const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 게시물 상태          //
  const { title, setTitle } = useBoardStore();
  const { contents, setContents } = useBoardStore();
  const { boardImageList, setBoardImageList, resetBoard } = useBoardStore();
  //          state: 게시물 이미지 미리보기 URL 상태          //
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const navigator = useNavigate();

  //          event handler: 제목 변경 이벤트 처리          //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const title = event.target.value;
    setTitle(title);
  }
  //          event handler: 내용 변경 이벤트 처리          //
  const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value;
    setContents(contents);
    if (!contentsTextAreaRef.current) return;
    contentsTextAreaRef.current.style.height = 'auto';
    contentsTextAreaRef.current.style.height = `${contentsTextAreaRef.current.scrollHeight}px`;
  }
  //          event handler: 이미지 변경 이벤트 처리          //
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map(url => url);
    newImageUrls.push(imageUrl);
    const newImages = boardImageList.map(image => image);
    newImages.push(file);

    setImageUrls(newImageUrls);
    setBoardImageList(newImages);
  }

  //          event handler: 이미지 업로드 버튼 클릭 이벤트 처리          //
  const onImageUploadButtonClickHandler = () => {
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  }
  //          event handler: 이미지 닫기 버튼 클릭 이벤트 처리          //
  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    if (!imageInputRef.current) return;
    imageInputRef.current.value = '';

    const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex);
    setImageUrls(newImageUrls);
    const newImages = boardImageList.filter((image, index) => index !== deleteIndex);
    setBoardImageList(newImages);
  }

  //          effect: 마운트 시 실행할 함수          //
  useEffect(() => {
    const  accessToken =  cookies.accessToken;
    if(! accessToken ){
      navigator(MAIN_PATH); 
      return;
      }
    resetBoard();
  }, []);

  //          render: 게시물 작성 화면 렌더링          //
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <input className='board-write-title-input' type='text' placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler} />
          </div>
          <div className='divider'></div>
          <div className='board-write-contents-box'>
            <textarea ref={contentsTextAreaRef} className='board-write-contents-textarea' placeholder='본문을 작성해주세요.' spellCheck={false} value={contents} onChange={onContentsChangeHandler} />
            <input ref={imageInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onImageChangeHandler} />
            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='image-box-light-icon'></div>
            </div>
          </div>
          <div className='board-write-images-box'>
            {imageUrls.map((imageUrl, index) => (
            <div className='board-write-image-box'>
              <img className='board-write-image' src={imageUrl} />
              <div className='icon-button image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                <div className='close-icon'></div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { };


