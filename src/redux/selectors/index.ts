import { RootState } from '../store';

export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectUser = (state: RootState) => state.auth.user;
