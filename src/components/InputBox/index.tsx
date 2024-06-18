import 'App.css';
import React, { ChangeEvent, Dispatch, KeyboardEvent, forwardRef } from 'react';
import './style.css';

// interface: Input Box 컴포넌트 Propperties
interface Props {
 label: String;
 type: 'text' | 'password';
 placeholder: string;
 value: string;
 setValue: Dispatch<React.SetStateAction<string>>;
 error: boolean;
 icon?: 'eye-off-icon' | 'eye-on-icon' ;
onButtonClick?: () => void;
message?: string;

 onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
//  component: input box 컴포넌트 //

// forwardRef는 부모 컴포넌트가 자식 컴포넌트의 DOM 노드나 자식 컴포넌트에 접근하도록 도와준다.
// 
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {


    // state: properties //
    const {label, type, placeholder, value, error, icon, message, onKeyDown} = props;
    const {setValue, onButtonClick} = props;

    // event halnder: input 키 이벤트 처리 함수 /
    const onChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setValue(value);
    }

    // render: Input Box 컴포넌트 //
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);

    }
    // component: Inbut Box 컴포넌트 //
    return(
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' :'inputbox-container' }>
               <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChangeHanlder}   onKeyDown={ onKeyDown}/>
               {onButtonClick !== undefined && (
               <div className='icon-button' onClick={onButtonClick}>
                    {icon !== undefined && ( <div className={`icon ${icon}`}></div>)} 
               </div>
               )}
               </div>
               {message !== undefined && <div className='inputbox-message'>{message}</div>}
         
        </div>

    )
});

export default InputBox;
