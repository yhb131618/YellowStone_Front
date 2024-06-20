export const MAIN_PATH = '/';
export const AUTH_PATH = '/auth';
export const SEARCH_PATH = (word: string) => `/search/${word}`;
export const BOARD_DETAIL_PATH = (boardNumber: number | string) => `/board/detail/${boardNumber}`;
export const BOARD_WRITE_PATH = '/board/write';
export const BOARD_UPDATE_PATH = (boardNumber: number | string) => `/board/update/${boardNumber}`;
export const USER_PATH = (email: string) => `/user/${email}`;


export const DETAIL_PATH = (boardNumber: number | string) => `detail/${boardNumber}`;
export const UPDATE_PATH = (boardNumber: number | string) => `update/${boardNumber}`;

export enum INPUT_ICON {
    ON = 'on',
    OFF = 'off',
    ARROW = 'arrow'
  };
  
  export const emailPattern = /^[A-Za-z0-9]*@([-.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  export const telNumberPattern = /^[0-9]{10,11}$/;
  
  export const COUNT_BY_PAGE = 5;
  export const COUNT_BY_PAGE_COMMENT = 3;
  export const PAGE_BY_SECTION = 10;
  export const COUNT_BY_SECTION = COUNT_BY_PAGE * PAGE_BY_SECTION;
  export const COUNT_BY_SECTION_COMMENT = COUNT_BY_PAGE_COMMENT * PAGE_BY_SECTION;

