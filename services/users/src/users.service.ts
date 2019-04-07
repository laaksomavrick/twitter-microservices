import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";
import { CassandraService, User } from "core-module";
import { CreateUserDto } from "./users.models";
import { RabbitmqService } from "./rabbitmq/rabbitmq.service";
import { Subscribe } from "./rabbitmq/rabbitmq.decorators";

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

    // this.rabbitMqService.publish(topic, message)
    // then figure out decorators for @Subscribe(topic)
    // decorate the method with the topic key
    // this should do something to make each method findable
    // set up consume handler on the topic key with the method as the callback
    // invoke the method
    // todo: keys from rabbitmq lib
    const key = "twtrmicro.user.create";

    // await this.rabbitmqService.subscribe(key, msg => {
    //   console.log("subscription!");
    //   console.log(JSON.parse(msg.content.toString()));
    // });

    await this.rabbitmqService.publish(key, userCreatedMessage);

    return user;
  }

  @Subscribe("twtrmicro.user.create")
  async handleUserCreated(message: object): Promise<void> {
    console.log(message);
  }
}
