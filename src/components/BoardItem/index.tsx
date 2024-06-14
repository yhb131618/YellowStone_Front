import DefaultProfileImage from 'assets/image/default-profile.png';
import React from 'react';
import type { BoardListItem } from 'types/interface';
import './style.css';

interface Props {
    boardListItem: BoardListItem;
}

// Component: Board List Item 컴포넌트 //
const BoardItem: React.FC<Props> = ({ boardListItem }) => {

    // properties
    const { boardNumber, title, content, boardTitleImage } = boardListItem;
    const { favoriteCount, commentCount, viewCount } = boardListItem;
    const { writerDatetime, writerNickname, writerProfileImage } = boardListItem;

    // event handler: 게시물 아이템 클릭 이벤트 처리 함수
    const onClickHandler = () => {
        // navigator(boardNumber);
    }

    // render: Board List Item 컴포넌트 렌더링 //
    return (
        <div className='board-list-item' onClick={onClickHandler}>
            <div className='board-list-item-main-box'>
                <div className='board-list-item-top'>
                    <div className='board-list-item-profile-box'>
                        <div className='board-list-item-profile-image' style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : DefaultProfileImage})` }}></div>
                    </div>
                    <div className='board-list-item-write-box'>
                        <div className='board-list-item-nickname'>{writerNickname}</div>
                        <div className='board-list-item-write-datetime'>{writerDatetime}</div>
                    </div>
                </div>

                <div className='board-list-item-middle'>
                    <div className='board-list-item-title'>{title} {boardNumber} </div>
                    <div className='board-list-item-content'>{content}</div>
                </div>

                <div className='board-list-item-bottom'>
                    <div className='board-list-item-counts'>{`댓글 ${commentCount} · 좋아요 ${favoriteCount} · 조회수 ${viewCount}`}</div>
                </div>

                {boardTitleImage !== null && (
                    <div className='board-list-item-image-box'>
                        <div className='board-list-item-image' style={{ backgroundImage: `url(${boardTitleImage})` }}></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BoardItem;
