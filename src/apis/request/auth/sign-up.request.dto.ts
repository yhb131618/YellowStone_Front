export default interface SignUpReqestDTO {
    email: string;
    password: string;
    nickname: string;
    telNumber: string;
    address: string;
    addressDetail : string |null;
    agreedPersonal: boolean;
    
}