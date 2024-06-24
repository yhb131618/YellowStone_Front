import type { LoginUser } from "types/interface";
import { create } from 'zustand';

interface LoginUserStore {
    loginUser: LoginUser | null;
    setLoginUser: (loginUser: LoginUser) => void;
    resetLoginUser: () => void;

}

const useLoginUserStore =create<LoginUserStore>(set=> ({
    loginUser: null,
    setLoginUser: loginUser => set(state =>( {...state, loginUser})),
    resetLoginUser: ()=> set(state => ({...state, loginUser: null}))
    }));

export default useLoginUserStore;

