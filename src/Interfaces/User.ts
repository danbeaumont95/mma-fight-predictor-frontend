export interface UserSignUpData {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password_confirm: string;
}
export interface UserLoginData {
  username: string;
  password: string;
}
