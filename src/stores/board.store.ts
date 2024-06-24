import { create } from 'zustand';

interface BoardStore {
    title: string;
    contents: string;
    boardImageList: File[];

    setTitle: (title: string) => void;
    setContents: (contents: string) => void;
    setBoardImageList: (images: File[]) => void;

    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: '',
    contents: '',
    boardImageList: [],

    setTitle: (title: string) => {set((state) => ({ ...state, title }))},
    setContents: (contents: string) => {set((state) => ({ ...state, contents }))},
    setBoardImageList: (boardImageList: File[]) => {set((state) => ({ ...state, boardImageList }))},

    resetBoard: () => {set((state) => ({ ...state, title: '', contents: '', boardImageList: [] }))}
}));

export default useBoardStore;