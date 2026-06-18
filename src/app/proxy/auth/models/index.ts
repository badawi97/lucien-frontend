import { ResultDto } from '../../shared';

export interface LoginDto {
  email?: string | null;
  password?: string | null;
}

export interface RegisterDto {
  email?: string | null;
  phone?: string | null;
  roleId?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
}

export interface TokenDto {
  accessToken?: string | null;
  expiresAt?: string;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: string;
}

export type TokenDtoResultDto = ResultDto<TokenDto>;

