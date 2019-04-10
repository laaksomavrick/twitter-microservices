import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { CassandraService, RabbitmqService, User } from "core-module";
import { CreateUserDto } from "./users.models";

@Injectable()
export class UsersService {
  constructor(
    private readonly cassandraService: CassandraService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, displayName, email } = createUserDto;
    let { password } = createUserDto;

    password = await bcrypt.hash(password, 10);

    const usersInput = { username, password, email, refreshToken: null };

    // todo: need to make sure email and username are unique
    // todo: authenticate user as well (ie; populate refresh token)

    const user = await this.cassandraService.insert<User>(
      User,
      "users",
      usersInput,
    );

    const userCreatedMessage = {
      username,
      displayName,
      email,
    };

    // todo: keys from rabbitmq lib
    const key = "twtrmicro.user.create";

    await this.rabbitmqService.publish(key, userCreatedMessage);

    return user;
  }
}
