import { Module } from "@nestjs/common";
import { UserProfilesModule } from "./user-profiles.module";

@Module({
  imports: [UserProfilesModule],
})
export class AppModule {}
