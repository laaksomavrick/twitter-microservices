import {
  Allow,
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

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  @Allow()
  readonly password: string;

  @IsOptional()
  @Allow()
  readonly accessToken?: string;
}
