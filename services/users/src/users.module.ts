import { Module } from "@nestjs/common";
import { CassandraModule, RabbitmqModule } from "core-module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [CassandraModule, RabbitmqModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
