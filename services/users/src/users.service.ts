import { Injectable, NotFoundException } from "@nestjs/common";
import { CassandraService, User } from "core-module";
import { CreateUserDto } from "./user.interfaces";

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

  async create(user: CreateUserDto): Promise<User> {
    // todo: data munging e.g bcrypt on password
    return this.cassandraService.insert<User>(User, "users", user);
  }
}
