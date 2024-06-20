import type { LoginUser } from 'types/interface';
import ResponseDto from '..';

export default interface GetUserResponseDto extends ResponseDto, LoginUser {

};