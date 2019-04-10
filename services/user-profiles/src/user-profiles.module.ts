import { Module } from "@nestjs/common";
import { CassandraModule, RabbitmqModule } from "core-module";
import { UserProfilesController } from "./user-profiles.controller";
import { UserProfilesService } from "./user-profiles.service";

@Module({
  imports: [CassandraModule, RabbitmqModule],
  controllers: [UserProfilesController],
  providers: [UserProfilesService],
})
export class UserProfilesModule {}
