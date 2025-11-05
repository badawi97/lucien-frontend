export interface LoginResponse {
    accessToken: string;
    refreshToken?: string;
    expiresAt?: number;
}