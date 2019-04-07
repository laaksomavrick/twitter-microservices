import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "core-module";
import { CreateUserDto } from "./users.models";
import { UsersService } from "./users.service";
import { Subscribe } from "./rabbitmq/rabbitmq.decorators";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  /**
   * Create a new user
   */
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

  @Subscribe("twtrmicro.user.create")
  async handleUserCreated(message: object): Promise<void> {
    console.log(message);
  }

  async authorize(): Promise<any> {}
}
