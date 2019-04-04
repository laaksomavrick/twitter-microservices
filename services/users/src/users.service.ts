import { Injectable, NotFoundException } from "@nestjs/common";
import { CassandraService, User, UserProfile } from "core-module";
import { CreateUserDto } from "./user.models";
import bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly cassandraService: CassandraService) {}

  async get(username: string): Promise<UserProfile> {
    const cql =
      "SELECT username, email, display_name FROM user_profiles WHERE username = ?";
    const users = await this.cassandraService.query<UserProfile>(
      UserProfile,
      cql,
      [username],
    );
    if (users.length === 0) {
      throw new NotFoundException();
    }

    return users[0];
  }

  async create(createUserDto: CreateUserDto): Promise<UserProfile> {
    const { username, displayName, email } = createUserDto;
    let { password } = createUserDto;

    password = await bcrypt.hash(password, 10);

    const usersInput = { username, password, access_token: null };
    const userProfilesInput = { username, displayName, email };

    // todo: need to make sure email and username are unique
    await this.cassandraService.insert<User>(User, "users", usersInput);
    return this.cassandraService.insert<UserProfile>(
      UserProfile,
      "user_profiles",
      userProfilesInput,
    );
  }
}
