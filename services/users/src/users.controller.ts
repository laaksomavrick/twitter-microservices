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
import { UserProfile } from "core-module";
import { CreateUserDto } from "./user.models";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Retrieve the user details for a particular user
   */
  @Get(":username")
  async get(@Param("username") username: string): Promise<UserProfile> {
    if (username == null) {
      throw new BadRequestException();
    }

    return this.userService.get(username);
  }

  /**
   * Create a new user
   */
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<UserProfile> {
    const { password, passwordConfirmation } = createUserDto;
    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        "password must be the same as passwordConfirmation",
      );
    }
    return this.userService.create(createUserDto);
  }

  async authorize(): Promise<any> {}
}
