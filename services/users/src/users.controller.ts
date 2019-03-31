import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "core-module";
import { CreateUserDto } from "./user.models";
import { UsersService } from "./users.service";
import { Validator } from "class-validator";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(":username")
  async get(@Param("username") username: string): Promise<User> {
    if (username == null) {
      throw new BadRequestException();
    }

    return this.userService.get(username);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { password, passwordConfirmation } = createUserDto;
    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        "password must be the same as passwordConfirmation",
      );
    }
    return this.userService.create(createUserDto);
  }
}
