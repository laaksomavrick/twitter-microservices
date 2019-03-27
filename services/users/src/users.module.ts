import { Module } from "@nestjs/common";
import { CassandraModule } from "core-module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [CassandraModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
