import { Injectable, NotFoundException } from "@nestjs/common";
import { CassandraService, User } from "core-module";

@Injectable()
export class UsersService {
  // class validator user
  constructor(private readonly cassandraService: CassandraService) {}

  async get(username: string): Promise<any> {

    const cql = "SELECT username, email, display_name FROM users WHERE username = ?";
    const users = await this.cassandraService.query<User>(User, cql, [username]);
    if (users.length === 0) {
      throw new NotFoundException();
    }

    return users[0];
  }
}
