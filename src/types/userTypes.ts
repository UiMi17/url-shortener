export interface IUser {
  id: number;
  email: string;
  username: string;
  role: 'User' | 'Admin';
}
