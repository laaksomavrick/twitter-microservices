import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class User {
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
  @MinLength(8)
  @MaxLength(128)
  @Allow()
  readonly password: string;

  @IsOptional()
  @Allow()
  readonly refreshToken?: string;
}
