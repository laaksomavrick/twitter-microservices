import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { CassandraService, User } from "core-module";
import { CreateUserDto } from "./users.models";

@Injectable()
export class UsersService {
  constructor(private readonly cassandraService: CassandraService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, displayName, email } = createUserDto;
    let { password } = createUserDto;

    password = await bcrypt.hash(password, 10);

    const usersInput = { username, password, email, refreshToken: null };
    // const userProfilesInput = { username, displayName, email };

    // todo: need to make sure email and username are unique
    // todo: broadcast over rmqp for user_profile service
    // todo: authenticate user as well (ie; populate refresh token)
    return this.cassandraService.insert<User>(User, "users", usersInput);
  }
}
