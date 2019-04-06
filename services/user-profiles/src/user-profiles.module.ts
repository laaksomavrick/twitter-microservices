import { Module } from "@nestjs/common";
import { CassandraModule } from "core-module";
import { UserProfilesController } from "./user-profiles.controller";
import { UserProfilesService } from "./user-profiles.service";

@Module({
  imports: [CassandraModule],
  controllers: [UserProfilesController],
  providers: [UserProfilesService],
})
export class UserProfilesModule {}
