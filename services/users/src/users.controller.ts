import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from "@nestjs/common";
import { User } from "core-module";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./user.interfaces";

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
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    // todo: validations via ValidationPipe for dto e.g password, passwordCOnfirm
    // todo: standard error handler / response fmt; { statusCode, msg, errors }

    const user = {
      username: "asdasdasdasd",
      password: "qweqweqweqwe",
      email: "email@hotmail.com",
      displayName: "displayName",
    };

    return this.userService.create(user as CreateUserDto);
  }
}
