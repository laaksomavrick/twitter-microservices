import { Controller, Get, Param, BadRequestException } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(":username")
  async get(@Param("username") username: string): Promise<any> {

    if (username == null) {
      throw new BadRequestException();
    }

    return this.userService.get(username);
  }
}
