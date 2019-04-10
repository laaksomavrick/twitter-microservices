import { Controller } from "@nestjs/common";
import { UserProfilesService } from "./user-profiles.service";
import { Subscribe } from "core-module";

@Controller("profiles")
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Subscribe("twtrmicro.user.create")
  async handleUserCreated(message: object): Promise<void> {
    console.log(message);
  }
}
