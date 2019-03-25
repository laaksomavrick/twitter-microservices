import { Inject, Injectable } from "@nestjs/common";
import { CASSANDRA_CLIENT, Client } from "cassandra-module";

@Injectable()
export class AppService {
  constructor(@Inject(CASSANDRA_CLIENT) private cassandraClient: Client) {}

  async getHello(): Promise<string> {
    const now = await this.cassandraClient.execute(
      "select now() from system.local",
    );
    return JSON.stringify(now.rows[0]);
  }
}
