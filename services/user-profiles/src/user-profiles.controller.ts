import { Controller } from "@nestjs/common";
import { UserProfilesService } from "./user-profiles.service";

@Controller("profiles")
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}
}
