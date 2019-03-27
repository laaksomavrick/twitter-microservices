import { BadRequestException, Controller, Get, Param } from "@nestjs/common";
import { User } from "core-module";
import { UsersService } from "./users.service";

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
}
