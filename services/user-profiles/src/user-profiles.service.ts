import { Injectable } from "@nestjs/common";
import { CassandraService } from "core-module";

@Injectable()
export class UserProfilesService {
  constructor(private readonly cassandraService: CassandraService) {}
}
