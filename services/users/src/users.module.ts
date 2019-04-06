import { Module } from "@nestjs/common";
import { CassandraModule } from "core-module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { RabbitmqModule } from "./rabbitmq/rabbitmq.module";

@Module({
  imports: [CassandraModule, RabbitmqModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
