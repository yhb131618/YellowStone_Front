import axios from 'axios';
import type { PostBoardRequestDto } from '../apis/request/board';
import type { PostBoardResponseDto } from '../apis/response/board';
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import ResponseDto from './response';
import { SignUpResponseDto } from "./response/auth";
import { GetSignInUserResponseDto } from "./response/user";
const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const authorization = (accessToken: string) => {
     return {headers: { Authorization: `Bearer ${accessToken}`}}
}
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

// description: sign in request //
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
    .then(response =>{
        const responseBody: SignInRequestDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if (!error.response.data) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    })
    return result;

}

// description: sign up request //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {

    const result = await axios.post(SIGN_UP_URL(), requestBody)
    .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
    })
    .catch(error=> {
        if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
    })
    return result;
}

const POST_BOARD_URL= () => `${API_DOMAIN}/board`;

export const postBoardRequest = async (requestBody: PostBoardRequestDto, token: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(token))
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        });
    return result;
};

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accesToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accesToken)).then(response => {
        const responseBody: GetSignInUserResponseDto = response.data;
        return responseBody;

    }). catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;     
    });
    return result;
}

const FILE_DOMAIN = `${DOMAIN}/file`;
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;
const mutipartFormData = {headers: {'Content-type': 'multipart/form-data'}};

export const fileUploadRequest = async (data: FormData ) => {
    const result = await axios.post(FILE_UPLOAD_URL(), data, mutipartFormData)
    .then(response => {
        const responseBody: string = response.data;
        return responseBody;
    })
    .catch (error => {
        return null;
    })
    return result;
}
