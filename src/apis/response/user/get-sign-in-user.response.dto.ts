import type { LoginUser } from 'types/interface';
import ResponseDto from '..';

export default interface GetSignInUserResponseDto extends ResponseDto, LoginUser {

}