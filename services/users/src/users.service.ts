import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CASSANDRA_CLIENT, Client, query } from "cassandra-module";
import { User } from "core-module";

@Injectable()
export class UsersService {
  constructor(@Inject(CASSANDRA_CLIENT) private cassandraClient: Client) {}

  async get(username: string): Promise<any> {

    const cql = "SELECT username, email, display_name FROM users WHERE username = ?";
    const users = await query<User>(User, this.cassandraClient, cql, [username]);
    if (users.length === 0) {
      throw new NotFoundException();
    }

    return users[0];
  }
}
