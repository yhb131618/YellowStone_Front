import DefaultProfileImage from 'assets/image/default-profile.png';
import React from 'react';
import type { BoardListItem } from 'types/interface';
import './style.css';

interface Props{
    top3ListItem: BoardListItem
}

//       component: Top 3 List Item 컴포넌트
export default function Top3Item({top3ListItem} : Props) {
    
    // properties
    const { boardNumber, title, content, boardTitleImage } = top3ListItem;
    const { favoriteCount, commentCount, viewCount } = top3ListItem;
    const { writerDatetime, writerNickname, writerProfileImage } = top3ListItem;
    //       component: Top 3 List Item 컴포넌트 렌더링

    // function: 네비게이션 함수
    // const navigator = useNavigate(); 

    //    event handler: 게시물 아이템 클릭 이벤트 처리 함수

    // render: Top 3 List Item 컴포넌트 렌더링
    return (
        <div className='top-3-list-item' style={{backgroundImage: `url(${ boardTitleImage })`}}>
            <div className='top-3-list-item-main-box' > 
                <div className='top-3-list-item-top'> 
                    <div className='top-3-list-item-profile-box'> 
                        <div className='top-3-list-item-profile-image' style={{backgroundImage: `url(${writerProfileImage ? writerProfileImage : DefaultProfileImage})` }}></div>
                    </div>
                    <div className='top-3-list-item-write-box'> 
                        <div className='top-3-list-item-nickname'>{writerNickname} </div>
                        <div className='top-3-list-item-write-date'>{writerDatetime} </div>                      
                    </div>
                </div>
                <div className='top-3-list-item-middle'> 
                    <div className='top-3-list-item-title'>{title} </div>
                    <div className='top-3-list-item-content'>{content} </div>
                </div>
                <div className='top-3-list-item-bottom'> 
                     <div className='top-3-list-item-counts'>{`댓글 ${commentCount} · 좋아요 ${favoriteCount} · 조회수 ${viewCount}`} </div>
                </div>
            </div>
        </div>
    
    )
}