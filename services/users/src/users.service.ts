import { Injectable, NotFoundException } from "@nestjs/common";
import { CassandraService, User } from "core-module";
import { CreateUserDto } from "./user.models";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly cassandraService: CassandraService) {}

  async get(username: string): Promise<User> {
    const cql =
      "SELECT username, email, display_name FROM users WHERE username = ?";
    const users = await this.cassandraService.query<User>(User, cql, [
      username,
    ]);
    if (users.length === 0) {
      throw new NotFoundException();
    }

    return users[0];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashed = await bcrypt.hash(password, 10);
    createUserDto.password = hashed;
    // todo: need to make sure email is unique
    return this.cassandraService.insert<User>(User, "users", createUserDto);
  }
}
