export interface CreateUserDto {
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  displayName: string;
}