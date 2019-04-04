import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  Allow,
} from "class-validator";

export class UserProfile {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  @Allow()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @Allow()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Allow()
  readonly displayName: string;
}
