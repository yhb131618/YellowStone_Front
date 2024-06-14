import deFaultProfileImae from 'assets/image/default-profile.png';
import React from 'react';
import type { FavoriteListItem } from 'types/interface';
import './style.css';

interface Props {
    favoriteListItem: FavoriteListItem;
}


// component: Favorit List Item 컴포넌트
export default function FavoriteItem({ favoriteListItem }: Props) {

    // properties
    const { profileImage, nickname} = favoriteListItem;

     // render: Favorit list Item 렌더링
    return (
        <div className='favorite-list-item'>
            <div className='favorite-list-item-profile-box'>
                   <div className='favorite-list-item-profile-image' style={{background: `url(${profileImage ? profileImage : deFaultProfileImae})`}}></div>    
            </div>
        <div className='favorite-list-item-nickname'>{nickname}</div>
        </div>
        
    )
}